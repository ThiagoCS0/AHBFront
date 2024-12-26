import React from "react"
import logo from './../../../../src/Recursos/icones/logo.png'
import "./Logo.css"


const inicio = import.meta.env.VITE_INICIAL;

export default function Logo() {

 const pagina_inicial = () => {
  sessionStorage.clear();
 }

 return (
  <a id="logo" href={inicio} onClick={() => pagina_inicial()}>
   <img src={logo} alt="Logo" />
   <div>
    <span>API</span>
    <span>HUB</span>
    <span>BRASIL</span>
   </div>
  </a>
 )
}