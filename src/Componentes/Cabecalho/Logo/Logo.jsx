import React from "react"
import LogoAHB from "../../../assets/logo.png"
import "./Logo.css"

const inicio = import.meta.env.VITE_INICIAL;

export default function Logo() {

 return (
  <a id="logo_AHB" href={inicio} >
   <img src={LogoAHB} alt="Logo" />
   <div>
    <span>AHB</span>
    <span>API</span>
    <span>HUB</span>
    <span>BRASIL</span>
   </div>
  </a>
 )
}