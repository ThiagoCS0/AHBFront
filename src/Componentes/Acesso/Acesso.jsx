import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Acessar from "./Acessar/Acessar";
import Criar from "./Criar/Criar";
import Recuperar from "./Recuperar/Recuperar";
import { validar_token } from "../Principais/Servicos/JWT/JWT";

const inicio = import.meta.env.VITE_INICIAL;
const site = import.meta.env.VITE_SITE;

export default function Acesso() {
  const [carregando, def_carregando] = useState(true);
  const [pagina, def_pagina] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const paginaAtual = sessionStorage.getItem("Acesso");
    if (paginaAtual) {
      def_pagina(paginaAtual);
    }
    def_carregando(false);
  }, []);

  useEffect(() => {
    def_carregando(false);
  }, [navegar]);

  useEffect(() => {
    def_pagina(sessionStorage.getItem("Acesso"));
  }, [sessionStorage.getItem("Acesso")])

  const componente = () => {
    switch (pagina) {
      case "Acessar": return <Acessar />;
      case "Criar": return <Criar />;
      case "Recuperar": return <Recuperar />;
      default: window.location.href = site;
    }
  };

  return (
    carregando ?
      <h1 style={{ fontSize: "large", padding: "40px" }}>Carregando...</h1>
      :
      <div id="acesso">
        {componente()}
      </div>
  )
}