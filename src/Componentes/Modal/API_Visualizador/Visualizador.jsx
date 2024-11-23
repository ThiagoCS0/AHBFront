import { useRef, useEffect, useState } from "react";
import "./Visualizador.css";
import { Erros } from "../../Principais/Erros/Erros";

export default function Visualizador({ api, fechar }) {
 const [tamanhoImg, defTamanhoImg] = useState({ lar: 0, alt: 0 });
 const [propietario, def_propietario] = useState('');

 return (
  <div id="modal_apis" onClick={fechar}>
   <div id="modal_apis_conteudo" onClick={e => { e.stopPropagation(); }}>
    <a href={api.link}><img src={api.imagem} alt={api.nome} /></a>
    <p><span>Nome</span>{api.nome}</p>
    <div>
     <p><span>Descrição</span><br />{api.descricao}</p>
     <p><span>Categoria</span><br />{api.categoria}</p>
    </div>
    <p><span>Link</span><a href={api.link}>{api.link}</a></p>
    <p><span>Publicador</span>{api.publicado}</p>
    <div id="modal_lista_metodos">
     {api.metodos && api.metodos.split(',').map((metodo) => {
      const metodoTrim = metodo.trim().toUpperCase();
      const cores = { GET: "#0A0", POST: "#808", DELETE: "#A00", PUT: "#AA0", PATCH: "#088", OPTIONS: "#448", HEAD: "#408", TRACE: "#48B", CONNECT: "#444", };
      return cores[metodoTrim] ? (
       <button key={metodoTrim} style={{ backgroundColor: cores[metodoTrim] }}>{metodoTrim}</button>
      ) : null;
     })}
    </div>
   </div>
  </div >
 );
}
