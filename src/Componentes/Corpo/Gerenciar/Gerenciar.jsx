import { Link, useNavigate } from "react-router-dom";
import Perfil from "./Perfil/Perfil"
import MinhasAPIs from "./MinhasAPIs/MinhasAPIs.jsx"
import { useEffect, useState } from "react";
import { validar_token } from "../../Principais/Servicos/JWT/JWT";
import "./Gerenciar.css"
import Termos from "../../AHB/Termos/Termos";
import Carregamento from "../../Principais/Carregamento/Carregamento.jsx";

const site = import.meta.env.VITE_SITE;

export default function Gerenciar() {
  const navegar = useNavigate();
  const [carregando, def_carregando] = useState(true);
  const [pagina, def_pagina] = useState("");

    useEffect(() => {
    const paginaAtual = sessionStorage.getItem("Gerenciar");
    if (paginaAtual) {
      def_pagina(paginaAtual);
    }
  }, []);

  useEffect(() => {
    if (!carregando) {
      const elementoAtivo = document.getElementById(sessionStorage.getItem("Gerenciar"));
      if (elementoAtivo) {
        opcao_ativa(elementoAtivo);
      }
    }
  }, [carregando]);
  
  useEffect(() => {
    opcao_ativa(document.getElementById(`${sessionStorage.getItem("Gerenciar")}`))
    def_pagina(sessionStorage.getItem("Gerenciar"));
  }, [sessionStorage.getItem("Gerenciar")])

  useEffect(() => {
    if (!validar_token()) {
      navegar("Acesso");
      return;
    }
    def_carregando(false);
  }, [navegar]);

  const opcao_ativa = e => {
    if (e) {
      document.querySelectorAll('#menu_gerenciador a').forEach((a) => a.classList.remove('ativo'));
      e.classList.add('ativo');
    }
  }

  const alterar_componente = (e) => {
    if(validar_token()){
    sessionStorage.setItem("Gerenciar", e);
    }else{
      window.location.href = site;
    }
  }

  const componente = () => {
    switch (pagina) {
      case "ger_apis": return <MinhasAPIs />;
      case "ger_termos": return <Termos />;
      case "ger_perfil": return <Perfil />;
      default: window.location.href = site;
    }
  };

  return (
    carregando ?
     <Carregamento carregando={carregando}/>
      :
      <div id="gerenciador">
        <div id="menu_gerenciador">
          <Link id="ger_perfil" onClick={(e) => { opcao_ativa(e.target); alterar_componente("ger_perfil") }}>Perfil</Link>
          <Link id="ger_apis" onClick={(e) => { opcao_ativa(e.target); alterar_componente("ger_apis") }}>Minhas APIs</Link>
          <Link id="ger_termos" onClick={(e) => { opcao_ativa(e.target); alterar_componente("ger_termos") }}>Termos</Link>
        </div>
        <div id="conteudo_gerenciador">
          {pagina != "ger_apis" && <h1 className="titulos_genrenciar ondulacao-1">{pagina == "ger_perfil" ? "Perfil" : "Termos de Uso"}</h1>}
          {componente()}
        </div>
      </div>
  );
}