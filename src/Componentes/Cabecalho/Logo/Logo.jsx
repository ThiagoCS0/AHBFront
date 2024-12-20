import React from "react"
import "./Logo.css"

const inicio = import.meta.env.VITE_INICIAL;

export default function Logo() {

 const pagina_inicial = () => {
  sessionStorage.clear();
 }

 return (
  <a id="logo_AHB" href={inicio} onClick={() => pagina_inicial()}>
   <img src="./icones/logo.png" alt="Logo" />
   <div>
    <span>AHB</span>
    <span>API</span>
    <span>HUB</span>
    <span>BRASIL</span>
   </div>
  </a>
 )
}