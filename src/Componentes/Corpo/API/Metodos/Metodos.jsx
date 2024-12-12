import React, { useState, useRef, useEffect } from "react";
import { meu_get } from "../../../Principais/Servicos/Backend/Conexao";
import Carregamento from "../../../Principais/Carregamento/Carregamento";
import "./Metodos.css";

export default function Metodos({ dados_offline, api }) {
  const [dados_metodo, def_dados_metodo] = useState({ url: '', header: '', body: '', token: false, });
  const [tamanho_img, def_tamanho_img] = useState({ lar: 0, alt: 0 });
  const [aba_ativa, def_aba_ativa] = useState("basico");
  const [carregando, def_carregando] = useState(true);
  const [imagem, def_imagem] = useState("./icones/image_padrao.png");
  const [publicador, def_publicador] = useState("");
  const abasRef = useRef(null);
  const [item_expandido, def_item_expandido] = useState({});
  const cores = { GET: "#0A0", POST: "#808", DELETE: "#A00", PUT: "#AA0", PATCH: "#088", OPTIONS: "#448", HEAD: "#408", TRACE: "#48B", CONNECT: "#222", };
  const categorias = api.categoria === "REDE_SOCIAIS" ? "REDE SOCIAIS" :
    api.categoria === "SAUDE" ? "SAÚDE" :
      api.categoria === "FINANCAS" ? "FINANÇAS" :
        api.categoria === "ESTATISTICAS" ? "ESTATÍSTICAS" :
          api.categoria;
  const [exibir_aviso_clicar_metodos, def_exibir_aviso_clicar_metodos] = useState(true);

  useEffect(() => {
    const tmp = setTimeout(() => { def_exibir_aviso_clicar_metodos(false); }, 7000);
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

    if (dados_offline) {
      def_publicador(api.publicador)
    } else { buscar_nome(); }

    def_carregando(false);

    return () => clearTimeout(tmp);
  }, [])

  useEffect(() => {
    if (api?.imagem) {
      if (dados_offline) {
        def_imagem(`./apis/${api.imagem}.png`)
      } else {
        validar_imagem(api.imagem).then((img) => def_imagem(img));
      }
    }
  }, [api?.imagem]);

  const validar_imagem = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve("./icones/image_padrao.png");
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

    const metodo_atual = api?.metodos[nome_aba];
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

  const copiar = (e) => {
    if (e.value) {
      e.closest("label").classList.add("copiado");
      navigator.clipboard.writeText(e.value);
      setTimeout(() => { e.closest("label").classList.remove("copiado") }, 3000)
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
                  <p><span className="span_destaque">Nome</span>{api.nome}</p>
                  <p><span className="span_destaque">Descrição</span>{api.descricao}</p>
                  <p><span className="span_destaque">Link</span>
                    <a href={api.link} target="_blank"
                      rel="noopener noreferrer" aria-hidden="true">
                      {api.link}</a></p>
                  <div className="campos_laterais">
                    <p><span className="span_destaque">Categoria</span><br />{categorias}</p>
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
                  {
                    Object.keys(api.metodos).map(metodo => {
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
                          {metodo_formatado === "VER_SITE" ? "CONSULTE" : metodo_formatado}
                        </button>
                      );
                    })
                  }
                </div>
              </div>
            </>
          }
        </div>
      );
    } else {
      let metodos = api.metodos[aba_ativa];

      if (!Array.isArray(metodos)) { metodos = [metodos]; }

      const alternar_expandido = (index) => {
        def_item_expandido((estado_atual) => (estado_atual === index ? null : index));
      };

      const ir_para = (link) => {
        const nova_aba = window.open(link, '_blank');
        if (nova_aba) {
          nova_aba.document.body.setAttribute('aria-hidden', 'true');
          nova_aba.opener = null;
        }
      }

      return (
        <div id="metodos_abas_conteudo" className="metodos_conteudo">
          <>
            {aba_ativa !== "ver_site" && exibir_aviso_clicar_metodos && <p id="metodos_aviso_metodos" className="efeito_iluminacao">Click nos metodos abaixo para mais informações!</p>}
            {metodos.map((metodo, index) => {
              const expandido = item_expandido === index;

              const cores = { VER_SITE: "var(--destaque)", GET: "#0A0", POST: "#808", DELETE: "#A00", PUT: "#AA0", PATCH: "#088", OPTIONS: "#448", HEAD: "#408", TRACE: "#48B", CONNECT: "#222", };
              return (
                <div key={index} className="metodo_item" style={{ justifyItems: (aba_ativa === "ver_site" && "center") }}>
                  <button
                    onClick={() => { aba_ativa === "ver_site" ? ir_para(metodo.url) : alternar_expandido(index); }}
                    className="metodos_expandir_metodos"
                  >
                    <p style={{ background: `${cores[aba_ativa.toUpperCase()]}` }}>{aba_ativa === "ver_site" ? metodo.titulo : aba_ativa.toUpperCase()}</p><p>{aba_ativa === "ver_site" ? metodo.url : metodo.titulo}</p>
                  </button>
                  {expandido && (
                    <div className="metodo_detalhes">
                      <label>URL
                        <input
                          type="text"
                          value={metodo.url}
                          onClick={(e) => copiar(e.target)}
                          readOnly
                        />
                      </label>
                      <label>Headers
                        <textarea
                          value={metodo.header || ""}
                          onClick={(e) => copiar(e.target)}
                          readOnly
                        />
                      </label>
                      <label>Body
                        <textarea
                          value={metodo.body || ""}
                          onClick={(e) => copiar(e.target)}
                          readOnly
                        />
                      </label>
                      <p>
                        <div className="alinhado" style={{ flexDirection: "column" }}>
                          {metodo.token ? (
                            <>
                              <p>Essa requisição <b className="normal">precisa de Token!</b></p>
                              <p>Você deve acessar o <b className="normal">site oficial</b> e se informar por lá, link abaixo:</p>
                              <a href={api.link} target="_blank" rel="noopener noreferrer" aria-hidden="true">{api.link}</a>
                            </>
                          ) : (
                            <b>Não precisa de token</b>
                          )}
                        </div>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            {
              aba_ativa !== "ver_site" &&
              <div className="alinhado" style={{ flexDirection: "column" }}>
                <p>Não deixe de visitar o site oficial e conhecer outros metodos</p>
                <a href={api.link} target="_blank" rel="noopener noreferrer" aria-hidden="true">{api.link}</a>
              </div>
            }
          </>
        </div>
      );
    }
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
                  Object.keys(api.metodos).map(metodo => (
                    <button
                      key={metodo}
                      id={`aba_${metodo}`}
                      onClick={() => { selecionar_aba(metodo); def_item_expandido(null); }}
                      className={aba_ativa === metodo ? "metodos_aba_ativa" : ""}
                    >
                      {(metodo === "ver_site" ? "Consulte" : metodo).trim().toUpperCase()}
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