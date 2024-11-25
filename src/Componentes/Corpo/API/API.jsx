import "./API.css";
import image_padrao from "../../../assets/image_padrao.png";
import React, { useEffect, useState } from "react";

export default function API({ api, classe, click, simples = true, def_api_excluir, editar_api }) {
 const [imagem, setImagem] = useState(image_padrao);
 const [tamanhoImg, defTamanhoImg] = useState({ lar: 0, alt: 0 });

 const verificarEValidarImagem = (url) => {
  return new Promise((resolve) => {
   const img = new Image();
   img.onload = () => resolve(url);
   img.onerror = () => resolve(image_padrao);
   img.src = url;
  });
 };


 useEffect(() => {
  if (api?.imagem) {
   verificarEValidarImagem(api.imagem).then((img) => setImagem(img));
  }
 }, [api?.imagem]);

 return (
  <>
   {
    simples ?
     <div className={"api " + classe} onClick={click}>
      <img src={imagem} alt={api.nome} style={{ objectFit: tamanhoImg.lar > tamanhoImg.alt ? "contain" : "cover" }} onLoad={e => { defTamanhoImg({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }} />
      <p> {api.nome.length > 15 ? api.nome.slice(0, 15) + "..." : api.nome}</p>
     </div>
     :
     <div className="apis" key={api.id} onClick={click}>
      <div className="lista_minhas_apis_dados">
       <img src={imagem} alt={api.nome || ""} style={{ objectFit: tamanhoImg.lar > tamanhoImg.alt ? "contain" : "cover" }} onLoad={e => { defTamanhoImg({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }} />
       <div className="lista_api_conteudo">
        <h3>{api.nome || ""}</h3>
        <div className="api_infor">
         <p>{api.descricao || ""}</p>
         <div className="lista_minhas_apis_metodos">
          {api.metodos && api.metodos.split(',').map((metodo) => {
           const metodoTrim = metodo.trim().toUpperCase();
           const cores = { GET: "#0A0", POST: "#808", DELETE: "#A00", PUT: "#AA0", PATCH: "#088", OPTIONS: "#448", HEAD: "#408", TRACE: "#48B", CONNECT: "#444", };
           return cores[metodoTrim] ? (
            <button key={metodoTrim} style={{ backgroundColor: cores[metodoTrim] }}>{metodoTrim}</button>
           ) : null;
          })}
         </div>
        </div>
       </div>
      </div>
      <div id="lista_minhas_apis_botoes" onClick={e => { e.stopPropagation(); }}>
       <button onClick={() => { if (api.id) { editar_api(api.id) } }}>Editar</button>
       <button onClick={() => { if (api.id) { def_api_excluir({ id: api.id, name: api.name }) } }}>Excluir</button>
      </div>
     </div>
   }
  </>
 );
}