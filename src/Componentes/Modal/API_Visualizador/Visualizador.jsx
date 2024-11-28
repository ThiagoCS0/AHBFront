import React, { useRef, useEffect, useState } from "react";
import { meus_erros } from "../../Principais/Erros/MeusErros";
import { meu_get } from "../../Principais/Servicos/APIs/Conexao";
import image_padrao from "../../../assets/image_padrao.png";
import "./Visualizador.css";

export default function Visualizador({ api, fechar }) {
  const [tamanho_img, def_tamanho_img] = useState({ lar: 0, alt: 0 });
  const [publicador, def_publicador] = useState('');
  const [modal_simples, def_modal_simples] = useState(true);
  const [imagem, set_imagem] = React.useState(image_padrao);

  const validar_imagem = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(image_padrao);
      img.src = url;
    });
  };

  React.useEffect(() => {
    if (api?.imagem) {
      validar_imagem(api.imagem).then((img) => set_imagem(img));
    }
  }, [api?.imagem]);

  useEffect(() => {
    const Get = async () => {
      if (!api) { return null; }
      const { dados_get } = await meu_get(`users/${api.publicador}/nome-publico`);
      if (dados_get) { def_publicador(dados_get.publicName); } else { alert("Erro") }
    }

    Get();

    const tecla = (e) => { if (e.key === "Escape") { fechar(); } };
    window.addEventListener("keydown", tecla);
    return () => { window.removeEventListener("keydown", tecla); };
  }, [api])

  return (
    <div id="modal_apis" onClick={fechar}>
      <div id="modal_apis_conteudo" className="ondulacao-1" onClick={e => { e.stopPropagation(); }}>
        <a href={modal_simples ? "#" : api.link}><img src={imagem} alt={api.nome} style={{ objectFit: tamanho_img.lar > tamanho_img.alt ? "contain" : "cover" }} onLoad={e => { def_tamanho_img({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }} /></a>
        <p><span>Nome</span>{api.nome}</p>
        <div>
          <p><span>Descrição</span><br />{api.descricao}</p>
          <p><span>Categoria</span><br />{api.categoria}</p>
        </div>
        {!modal_simples && (
          <>
            <p><span>Link</span><a href={api.link}>{api.link}</a></p>
            <p><span>Publicador</span>{publicador}</p>
          </>
        )}
        <div id="modal_lista_metodos">
          <span>Metodos</span>
          <div>
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
    </div >
  );
}