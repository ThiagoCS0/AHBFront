import { useState, useEffect } from "react"
import "./PaginaErros.css"

const site = import.meta.env.VITE_BACKEND_SITE;

export default function PaginaErros() {

 return (
  <div id="pagina_erros" className="ondulacao-1" >
   <div>
    <h1>404</h1>
    <p>
     Em <b>"{window.location.href}"</b> esse <b>"{window.location.pathname}"</b> não existe!
    </p>
    <br />
    {
     window.location.href != site &&
     <div id="tentar_novamente">
      <p>Tente voltar ao</p>
      <button onClick={() => { window.location.href = site; }}>INICIO</button>
     </div>
    }
   </div>
  </div>
 )
}