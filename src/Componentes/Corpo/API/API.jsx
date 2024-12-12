import "./API.css";
import React, { useEffect, useState } from "react";

export default function API({ dados_offline, api, classe, click, simples = true, def_api_excluir, editar_minhas_api }) {
  const [tamanhoImg, defTamanhoImg] = useState({ lar: 0, alt: 0 });
  const [imagem, def_imagem] = useState("/icones/image_padrao.png");

  const validar_imagem = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve("/icones/image_padrao.png");
      img.src = url;
    });
  };

  useEffect(() => {
    if (api?.imagem) {
      if(dados_offline){
        def_imagem(`/apis/${api.imagem}.png`)
      }else{
      validar_imagem(api.imagem).then((img) => def_imagem(img));
      }
    }
  }, [api?.imagem]);

  return (
    <>
      {
        simples ?
          <div className={"api " + classe} onClick={click}>
            <img className="apis" src={imagem} alt={api.nome} style={{ objectFit: tamanhoImg.lar > tamanhoImg.alt ? "contain" : "cover" }} onLoad={e => { defTamanhoImg({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }} />
            <p> {api.nome.length > 15 ? api.nome.slice(0, 15) + "..." : api.nome}</p>
          </div>
          :
          <div className="apis" onClick={click}>
            <div className="lista_minhas_apis_dados">
              <img src={imagem} alt={api.nome || ""} style={{ objectFit: tamanhoImg.lar > tamanhoImg.alt ? "contain" : "cover" }} onLoad={e => { defTamanhoImg({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }} />
              <div className="lista_api_conteudo">
                <h3>{api.nome || ""}</h3>
                <div className="api_infor">
                  <p>{api.descricao || ""}</p>
                  <div className="lista_minhas_apis_metodos">
                    {
                      api.metodos && api.metodos.split(',').map((metodo) => {
                        const metodoTrim = metodo.trim().toUpperCase();
                        const cores = { GET: "#0A0", POST: "#808", DELETE: "#A00", PUT: "#AA0", PATCH: "#088", OPTIONS: "#448", HEAD: "#408", TRACE: "#48B", CONNECT: "#222", };
                        return cores[metodoTrim] ? (
                          <button key={metodoTrim} style={{ backgroundColor: cores[metodoTrim] }}>{metodoTrim}</button>
                        ) : null;
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <div id="lista_minhas_apis_botoes" onClick={e => { e.stopPropagation(); }}>
              <button onClick={() => { if (api.id) { editar_minhas_api(api.id) } }}>Editar</button>
              <button onClick={() => { if (api.id) { def_api_excluir({ id: api.id, name: api.name }) } }}>Excluir</button>
            </div>
          </div>
      }
    </>
  );
}