import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Acessar from "./Acesso/Acessar";

export default function Acesso() {

 const navegar = useNavigate();
 const [pagina, defPagina] = useState("Acessar");

 const componente = () => {
  switch (pagina) {
   case "Acessar": return <Acessar/>;
   case "Cadastrar": return <Acessar />;
   case "Recuperar": return <Acessar />;
   default: window.location.href = "/";
  }
 };

 return (
  <div id="acesso">
   {componente()}
  </div>
 )
}