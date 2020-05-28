import React from "react";
import "./Home.scss";
import { Logo } from "../../assets";
import GenerateCSV from "../GenerateCSV/GenerateCSV";

const Home = () => {
  return (
    <section className="home-container">
      <img src={Logo} alt="JaeeMarket" width="200px" />
      <h1>Bem vindo ao Append Bairro CSV</h1>
      <h2>Envie o CVS e retornaremos o CSV com a coluna Bairro</h2>
      <GenerateCSV />
      {/* <label className="label-upload" for="file">
        {loading ? "Aguarde..." : "Enviar CSV"}
      </label>
      <input
        type="file"
        className="input-upload"
        id="file"
        onChange={processFile}
        disabled={loading ? true : false}
      /> */}
    </section>
  );
};

export default Home;
