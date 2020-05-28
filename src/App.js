import React from "react";
import "./App.css";
import Papa from "papaparse";
import axios from "axios";

function App() {
  const generateCsv = (obj, fileName = "teste") => {
    const content = Papa.unparse(obj);
    console.log(content);
    var a = document.createElement("a");
    const mimeType = "application/octet-stream";

    if (navigator.msSaveBlob) {
      // IE10
      navigator.msSaveBlob(
        new Blob([content], {
          type: mimeType,
        }),
        fileName
      );
    } else if (URL && "download" in a) {
      //html5 A[download]
      a.href = URL.createObjectURL(
        new Blob([content], {
          type: mimeType,
        })
      );
      a.setAttribute("download", `${fileName}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.location.href =
        "data:application/octet-stream," + encodeURIComponent(content); // only this mime type is supported
    }
  };

  const getNeighborhood = (cep) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://proxier.now.sh/api?url=https://viacep.com.br/ws/${cep}/json/`
        )
        .then((res) => resolve(res.data.bairro));
    });
  };

  const formatCep = (cep) => (cep ? cep.replace(/\D/gim, "") : "");

  const handleCompleteParse = async (json) => {
    const list = json.data;
    const keys = list.shift();
    const formattedList = list.map((list) => {
      const obj = {};
      list.forEach((value, index) => (obj[keys[index]] = value));
      return obj;
    });

    const promises = formattedList.map(async (item) => ({
      ...item,
      " Bairro ": await getNeighborhood(formatCep(item["Shipping Zip"])),
    }));
    const listWithNeighborhood = await Promise.all(promises);
    generateCsv(listWithNeighborhood);
  };

  const processFile = async (event) => {
    Papa.parse(event.target.files[0], {
      config: {
        delimiter: ",",
        header: true,
      },
      complete: handleCompleteParse,
    });
  };

  return (
    <div className="App">
      <input type="file" id="file" onChange={processFile} />
    </div>
  );
}

export default App;
