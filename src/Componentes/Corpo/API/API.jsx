import { clicar_apis, validar_imagem } from "../../Principais/Servicos/APIs/APIs";
import React, { useEffect, useState } from "react";
import "./API.css";

export default function API({ dados_offline, api, classe, click, simples = true, def_api_excluir, editar_minhas_api }) {
  const [tamanhoImg, defTamanhoImg] = useState({ lar: 0, alt: 0 });
  const [imagem, def_imagem] = useState(null);

  useEffect(() => {
    const imgx = async () => {
      const img = await validar_imagem(api.imagem, dados_offline);
      def_imagem(img)
    }
    imgx()
  }, [api?.imagem]);

  const clicado = (api) => {
    clicar_apis(api.id)
    click()
  }


  return (
    <>
      {
        simples ?
          <div className={"api " + classe} onClick={() => { clicado(api) }}>
            <img className="apis" src={imagem} alt={api.nome} style={{ objectFit: tamanhoImg.lar > tamanhoImg.alt ? "contain" : "cover" }} onLoad={e => { defTamanhoImg({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }} />
            <p>{api.nome.length > 15 ? api.nome.slice(0, 15) + "..." : api.nome}</p>
          </div>
          :
          <div className="apis" onClick={() => { clicado(api) }}>
            <div className="lista_minhas_apis_dados">
              <img src={imagem} alt={api.nome || ""} style={{ objectFit: tamanhoImg.lar > tamanhoImg.alt ? "contain" : "cover" }} onLoad={e => { defTamanhoImg({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }} />
              <div className="lista_api_conteudo">
                <h3>{api.nome || ""}</h3>
                <div className="api_infor">
                  <p>{api.descricao || ""}</p>
                  <div className="lista_minhas_apis_metodos">{
                    api.metodos && Object.keys(api.metodos).map(metodo => {
                      const metodo_formatado = metodo.trim().toUpperCase();
                      const cores = { VER_SITE: "var(--destaque)", GET: "#0A0", POST: "#808", DELETE: "#A00", PUT: "#AA0", PATCH: "#088", OPTIONS: "#448", HEAD: "#408", TRACE: "#48B", CONNECT: "#222", };
                      return cores[metodo_formatado] ? (
                        <button key={metodo_formatado} style={{ backgroundColor: cores[metodo_formatado] }}>
                           {metodo_formatado === "VER_SITE" ? "CONSULTE" : metodo_formatado}
                        </button>
                      ) : null;
                    })
                  }</div>
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