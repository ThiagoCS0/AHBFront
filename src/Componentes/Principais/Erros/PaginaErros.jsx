import { useState, useEffect } from "react"
import "./PaginaErros.css"

export default function PaginaErros() {

 return (
  <div id="pagina_erros" className="ondulacao" >
   <div>
    <h1>404</h1>
    <p>
     Em <b>"{window.location.href}"</b> esse <b>"{window.location.pathname}"</b> não existe!
    </p>
    <br />
    {
     window.location.href != "/" &&
     <div id="tentar_novamente">
      <p>Tente voltar ao</p>
      <button onClick={() => { window.location.href = "/"; }}>INICIO</button>
     </div>
    }
   </div>
  </div>
 )
}