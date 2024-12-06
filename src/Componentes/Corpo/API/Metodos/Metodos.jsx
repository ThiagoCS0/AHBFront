import React, { useState, useRef, useEffect } from "react";
import "./Metodos.css";
import { usuario_nome } from "../../../Principais/Servicos/Usuario/Usuario";
import image_padrao from "../../../../assets/image_padrao.png";
import Carregamento from "../../../Principais/Carregamento/Carregamento";
import { meu_get } from "../../../Principais/Servicos/Backend/Conexao";

export default function Metodos({ api }) {
  const [tamanho_img, def_tamanho_img] = useState({ lar: 0, alt: 0 });
  const [publicador, def_publicador] = useState("");
  const [carregando, def_carregando] = useState(true);
  const [aba_ativa, def_aba_ativa] = useState("basico");
  const [imagem, def_imagem] = useState(image_padrao);
  const abasRef = useRef(null);
  const [dados_metodo, def_dados_metodo] = useState({ url: '', header: '', body: '', token: false, });

  useEffect(() => {
    const dados_api = sessionStorage.getItem("API");
    if (dados_api) {
      selecionar_aba(JSON.parse(dados_api)[1].toLowerCase())
    }
    const buscar_nome = async () => {
      def_publicador('')
      if (api.userId.id && api.userId.id != "undefined") {
        const { status_get, dados_get } = await meu_get(`users/${api.userId.id}/nome-publico`);
        if (Math.floor(status_get / 100) === 2 && dados_get) { def_publicador(dados_get.publicName); }
      }
    }

    buscar_nome();
    def_carregando(false);
  }, [])

  useEffect(() => {
    if (api?.icon) {
      validar_imagem(api.icon).then((img) => def_imagem(img));
    }
  }, [api?.icon]);

  const validar_imagem = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(image_padrao);
      img.src = url;
    });
  };

  const selecionar_aba = (nome_aba) => {
    def_aba_ativa(nome_aba);
    const aba_elemento = document.getElementById(`aba_${nome_aba}`);
    if (aba_elemento) {
      aba_elemento.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }

    const metodo_atual = api?.methods[nome_aba];
    if (metodo_atual) {
      def_dados_metodo({
        url: metodo_atual.url,
        header: JSON.stringify(metodo_atual.header, null, 2),
        body: JSON.stringify(metodo_atual.body, null, 2),
        token: metodo_atual.token,
      });
    }
  };

  const scroll_abas = (direcao) => {
    if (abasRef.current) {
      abasRef.current.scrollBy({
        left: direcao === "direita" ? 150 : -150,
        behavior: "smooth"
      });
    }
  };

  const cores = { GET: "#0A0", POST: "#808", DELETE: "#A00", PUT: "#AA0", PATCH: "#088", OPTIONS: "#448", HEAD: "#408", TRACE: "#48B", CONNECT: "#222", };

  const copiar = (e) => {
    if (e) {
      navigator.clipboard.writeText(e);
      alert("Copiado!")
    }
  }

  const renderizar_conteudo = () => {
    if (aba_ativa === "basico") {
      return (
        <div id="pagina_api_basico" className="metodos_conteudo ondulacao-1">
          {
            <>
              <div id="pagina_api_basico_conteudo">
                <div>
                  <p><span className="span_destaque">Nome</span>{api.name}</p>
                  <p><span className="span_destaque">Descrição</span>{api.description}</p>
                  <p><span className="span_destaque">Link</span>
                    <a href={api.link} target="_blank"
                      rel="noopener noreferrer" aria-hidden="true">
                      {api.link}</a></p>
                  <div className="campos_laterais">
                    <p><span className="span_destaque">Categoria</span><br />{api.categoria}</p>
                    {publicador && <p><span className="span_destaque">Publicador</span><br />{publicador}</p>}
                  </div>
                </div>
                <div>
                  <a href={api.link}
                    target="_blank" id="pagina_api_logo"
                    rel="noopener noreferrer" aria-hidden="true">
                    <img src={imagem} alt={api.nome}
                      style={{ objectFit: tamanho_img.lar > tamanho_img.alt ? "contain" : "cover" }}
                      onLoad={e => { def_tamanho_img({ lar: e.target.naturalWidth, alt: e.target.naturalHeight }) }} />
                  </a>
                </div>
              </div>
              <div id="pagina_api_basico_metodos">
                <span className="span_destaque">Metodos</span>
                <div>
                  {Object.keys(api?.methods).map(metodo => {
                    const metodo_formatado = metodo.trim().toUpperCase();
                    const cor = cores[metodo_formatado] || "var(--destaque-escuro)";
                    return (
                      <button
                        key={metodo}
                        id={`aba_${metodo}`}
                        onClick={() => selecionar_aba(metodo)}
                        className={aba_ativa === metodo ? "metodos_aba_ativa" : ""}
                        style={{ backgroundColor: cor }}
                      >
                        {metodo_formatado}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          }
        </div>
      );
    }

    return (
      <>
        <div id="metodos_abas_conteudo" className="metodos_conteudo ondulacao-1">
          <div>
            <label>URL</label>
            <input
              type="text"
              value={dados_metodo.url}
              onClick={e => { copiar(e.target.value) }}
              readOnly
            />
          </div>
          <div>
            <label>Headers</label>
            <textarea
              value={dados_metodo.header === "\"\"" ? "" : dados_metodo.header}
              onClick={e => { copiar(e.target.value) }}
              readOnly
            />
          </div>
          <div>
            <label>Body</label>
            <textarea
              value={dados_metodo.body === "\"\"" ? "" : dados_metodo.body}
              onClick={e => { copiar(e.target.value) }}
              readOnly
            />
          </div>
          <div id="metodos_token">
            {
              dados_metodo.token ?
                <>
                  <p>Essa requisição <b>precisa de Token</b>!</p>
                  <p>Você deve acessar o <b>site oficial</b> e se informar por lá, link abaixo:</p>
                  <a href={api.link}
                    target="_blank" rel="noopener noreferrer" aria-hidden="true">{api.link}</a>
                </>
                :
                <p><b>Não precisa de token.</b></p>
            }
          </div>
        </div>
      </>
    );
  };

  return (
    carregando ?
      <Carregamento />
      :
      <div id="metodos">
        <div id="metodos_abas">
          <button
            className={aba_ativa === "basico" ? "metodos_aba_ativa" : ""}
            onClick={() => selecionar_aba("basico")}
          >
            Básico
          </button>
          <div>
            <button className="metodos_setas" aria-label="Rolagem para a esquerda" onClick={() => scroll_abas("esquerda")}></button>
            <div id="metodos_abas_metodos_efeito">
              <div className="metodos_abas_metodos" ref={abasRef}>
                {
                  Object.keys(api.methods).map(metodo => (
                    <button
                      key={metodo}
                      id={`aba_${metodo}`}
                      onClick={() => selecionar_aba(metodo)}
                      className={aba_ativa === metodo ? "metodos_aba_ativa" : ""}
                    >
                      {metodo.trim().toUpperCase()}
                    </button>
                  ))
                }
              </div>
            </div>
            <button id="metodos_seta_direita" aria-label="Rolagem para a direita" className="metodos_setas" onClick={() => scroll_abas("direita")}></button>
          </div>
        </div>
        {renderizar_conteudo()}
      </div>
  );
}
