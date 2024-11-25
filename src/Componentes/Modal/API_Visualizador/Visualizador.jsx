import React, { useRef, useEffect, useState } from "react";
import { MeusErros } from "../../Principais/Erros/MeusErros";
import { meu_get } from "../../Principais/Servicos/APIs/Conexao";
import image_padrao from "../../../assets/image_padrao.png";
import "./Visualizador.css";

export default function Visualizador({ api, fechar }) {
  const [tamanhoImg, defTamanhoImg] = useState({ lar: 0, alt: 0 });
  const [publicador, def_publicador] = useState('');
  const [imagem, setImagem] = React.useState(image_padrao);

  const verificarEValidarImagem = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(image_padrao);
      img.src = url;
    });
  };

  React.useEffect(() => {
    if (api?.imagem) {
      verificarEValidarImagem(api.imagem).then((img) => setImagem(img));
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
      <div id="modal_apis_conteudo" className="ondulacao" onClick={e => { e.stopPropagation(); }}>
        <a href={api.link}><img src={imagem} alt={api.nome} style={{ objectFit: tamanhoImg.lar > tamanhoImg.alt ? "contain" : "cover" }} onLoad={e => { defTamanhoImg({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }}/></a>
        <p><span>Nome</span>{api.nome}</p>
        <div>
          <p><span>Descrição</span><br />{api.descricao}</p>
          <p><span>Categoria</span><br />{api.categoria}</p>
        </div>
        <p><span>Link</span><a href={api.link}>{api.link}</a></p>
        <p><span>Publicador</span>{publicador}</p>
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
