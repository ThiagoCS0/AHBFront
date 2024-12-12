import React, { useEffect, useState } from "react";
import { meu_get } from "../../Principais/Servicos/Backend/Conexao";
import "./Visualizador.css";
import Carregamento from "../../Principais/Carregamento/Carregamento";

const site = import.meta.env.VITE_SITE;

export default function Visualizador({ dados_offline, api, fechar, modal_simples = false }) {
  const [tamanho_img, def_tamanho_img] = useState({ lar: 0, alt: 0 });
  const [publicador, def_publicador] = useState('');
  const [carregando, def_carregando] = useState(true);
  const [imagem, def_imagem] = useState("./icones/image_padrao.png");

  const validar_imagem = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve("./icones/image_padrao.png");
      img.src = url;
    });
  };

  useEffect(() => {
    if (api?.imagem) {
      if(dados_offline){
        def_imagem(`./apis/${api.imagem}.png`)
      }else{
      validar_imagem(api.imagem).then((img) => def_imagem(img));
      }
    }
  }, [api?.imagem]);

  useEffect(() => {
    const verificar_dados_api = async () => {
      if (!api) { return null; }

      def_publicador('')
      if (api.publicador && api.publicador != "undefined") {

        if (dados_offline) {
          def_publicador(api.publicador);
        } else {
          const { status_get, dados_get } = await meu_get(`users/${api.publicador}/nome-publico`);
          if (!status_get && !dados_get) { window.location.href = site; }
          if (dados_get) { def_publicador(dados_get.publicName); }
        }
      }
      def_carregando(false);
    }

    verificar_dados_api();

    const tecla = (e) => { if (e.key === "Escape") { fechar(); } };
    window.addEventListener("keydown", tecla);
    return () => { window.removeEventListener("keydown", tecla); };
  }, [api])

  return (
    <div id="modal_apis" onClick={fechar}>
      <div className="modal_apis_conteudo ondulacao-1" onClick={e => { e.stopPropagation(); }}>
        {carregando ?
          <Carregamento carregando={carregando} />
          :
          <>
            <a href={modal_simples ? "#" : api.link}
              target="_blank" id="modal_apis_logo"
              rel="noopener noreferrer" aria-hidden="true">
              <img src={imagem} alt={api.nome} style={{ objectFit: tamanho_img.lar > tamanho_img.alt ? "contain" : "cover" }} onLoad={e => { def_tamanho_img({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }} /></a>
            <div id="modal_apis_conteudo_basico">
              <p><span className="span_destaque">Nome</span>{api.nome}</p>
              <div>
                <p><span className="span_destaque">Descrição</span><br />{api.descricao}</p>
                <p><span className="span_destaque">Categoria</span><br />{api.categoria}</p>
              </div>
              {!modal_simples && (
                <>
                  <p><span className="span_destaque">Link</span>
                    <a href={api.link} target="_blank"
                      rel="noopener noreferrer" aria-hidden="true">
                      {api.link}</a></p>
                  {publicador && <p><span className="span_destaque">Publicador</span>{publicador}</p>}
                </>
              )}
            </div>
            <div id="modal_lista_metodos">
              <span className="span_destaque">Metodos</span>
              <div>
                {
                  api.metodos && Object.keys(dados_offline ? api.metodos : JSON.parse(api.metodos)).map(metodo => {
                    const metodo_formatado = metodo.trim().toUpperCase();
                    const cores = { VER_SITE: "var(--destaque)", GET: "#0A0", POST: "#808", DELETE: "#A00", PUT: "#AA0", PATCH: "#088", OPTIONS: "#448", HEAD: "#408", TRACE: "#48B", CONNECT: "#222", };
                    return cores[metodo_formatado] ? (
                      <button key={metodo_formatado} style={{ backgroundColor: cores[metodo_formatado] }}
                        onClick={() => { sessionStorage.setItem("API", JSON.stringify([api.id, metodo_formatado])); window.location.reload(); }}>
                        {metodo_formatado === "VER_SITE" ? "CONSULTE" : metodo_formatado}</button>
                    ) : null;
                  })
                }
              </div>
            </div>
          </>
        }
      </div>
    </div >
  );
}
