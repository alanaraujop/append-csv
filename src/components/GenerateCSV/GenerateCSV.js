import React, { useState } from "react";
import "./GenerateCSV.scss";
import { processFile } from "../../service/generateCSV.service";

const GenerateCSV = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <label className="label-upload" htmlFor="file">
        {loading ? "Aguarde..." : "Enviar CSV"}
      </label>
      <input
        type="file"
        className="input-upload"
        id="file"
        onChange={(event) => processFile(event, setLoading)}
        disabled={loading ? true : false}
      />
    </>
  );
};

export default GenerateCSV;
