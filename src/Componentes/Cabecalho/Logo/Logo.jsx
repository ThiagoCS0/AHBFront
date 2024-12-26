import React from "react"
import "./Logo.css"

const inicio = import.meta.env.VITE_INICIAL;

export default function Logo() {

 const pagina_inicial = () => {
  sessionStorage.clear();
 }

 return (
  <a id="logo" href={inicio} onClick={() => pagina_inicial()}>
   <img src="./../src/Recursos/icones/logo.png" alt="Logo" />
   <div>
    <span>API</span>
    <span>HUB</span>
    <span>BRASIL</span>
   </div>
  </a>
 )
}