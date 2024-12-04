import React, { useEffect, useState } from "react";
import "./MinhasAPIs.css";
import { validar_token } from "../../../Servicos/JWT/JWT";
import { meu_delete, meu_get } from "../../../Servicos/APIs/Conexao";
import { usuario_id } from "../../../Servicos/Usuario/Usuario";
import { meus_erros } from "../../../Erros/MeusErros";
import Visualizador from "../../../../Modal/API_Visualizador/Visualizador"
import Editor from "../../../../Modal/API_Editor/Editor"
import image_padrao from "../../../../../assets/image_padrao.png";
import API from "../../../../Corpo/API/API";
import Carregamento from "../../../Carregamento/Carregamento";

const site = import.meta.env.VITE_SITE;

export default function MinhasApis({ editar_api, exibir_modal_editar, def_editar_api, def_exibir_modal_editar }) {

  const [exibir_modal_visualizar, def_exibir_modal_visualizar] = useState(false);
  const [carregando, def_carregando] = useState(true);
  const [nova_api, def_nova_api] = useState([]);
  const [api_excluir, def_api_excluir] = useState({ id: null, name: "" });
  const [api_selec, def_api_selec] = useState(null);
  const [imagem, setImagem] = useState(image_padrao);
  const verificarEValidarImagem = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(image_padrao);
      img.src = url;
    });
  };

  useEffect(() => {
    //-------------------------------------------------------------------------------- isso foi criado por causa do ( React.StrictMode do main.jsx) 
    const ultimaRequisicao = sessionStorage.getItem('ultimaRequisicao');
    const tempoAtual = Date.now();

    if (!ultimaRequisicao || tempoAtual - parseInt(ultimaRequisicao) > 10) {
      sessionStorage.setItem('ultimaRequisicao', tempoAtual);
      sessionStorage.setItem("Paginas", "MinhasAPIs")
      lista_minhas_apis();
    } else {
      def_carregando(false);
    }
    //-------------------------------------------------------------------------------- so deve ser substituido por listaApis() em Produção!
  }, []);

  useEffect(() => {
    if (nova_api?.imagem) {
      verificarEValidarImagem(nova_api.imagem).then((img) => setImagem(img));
    }
  }, [nova_api?.imagem]);

  useEffect(() => {
    if (api_excluir.id) {
      const teclas = (e) => { if (e.key === "Escape") { fechar_modais_minhas_apis(); } };
      window.addEventListener("keydown", teclas);
      return () => { window.removeEventListener("keydown", teclas); };
    }
  }, [api_excluir.id]);

  useEffect(() => {
    if (!exibir_modal_visualizar) {
      def_editar_api(null);
    }
  }, [exibir_modal_visualizar])

  const lista_minhas_apis = async () => {
    try {
      const token = validar_token();
      if (token) {
        const id_usuario = usuario_id();
        if (id_usuario !== "") {
          const { status_get, dados_get } = await meu_get(`apis/user/${id_usuario}`, true);
          if (!status_get && !dados_get) { window.location.href = site; }
          if (Math.floor(status_get / 100) !== 2) {
            meus_erros(import.meta.url.split('/').pop(), "MNH_LST_!OK " + status_get);
            return;
          }
          if (dados_get) {
            def_nova_api([])
            dados_get.forEach(api => {
              const categoriaCorrigida =
                api.categoria === "REDE_SOCIAIS" ? "REDE SOCIAIS" :
                  api.categoria === "SAUDE" ? "SAÚDE" :
                    api.categoria === "FINANCAS" ? "FINANÇAS" :
                      api.categoria === "ESTATISTICAS" ? "ESTATÍSTICAS" :
                        api.categoria;
              cadastrar_minhas_apis({
                id: api.id,
                nome: api.name,
                descricao: api.description,
                metodos: api.methods,
                link: api.link,
                categoria: categoriaCorrigida,
                imagem: api.icon,
                publicador: api.userId.id
              });
            })
          }
        }
      } else {
        sessionStorage.clear();
        remover_token();
        window.location.href = site;
        return;
      }
    } catch (erro) {
      meus_erros(import.meta.url.split('/').pop(), "CAT_LST_API", erro);
      return false;
    } finally {
      def_carregando(false); // Quando o JWT é validado, carrega o componente
    }
  }

  const cadastrar_minhas_apis = (dadosApi) => {
    try {
      def_nova_api(tmp => [...tmp, dadosApi]);
    } catch (erro) {
      meus_erros(import.meta.url.split('/').pop(), "CAT_MIA_CAD", erro);
    }
  };

  const atualizar_minhas_api = (apiEditada) => {
    def_nova_api(tmp => tmp.filter(apis => apis.id !== apiEditada.id).concat({ ...apiEditada }));
    def_exibir_modal_visualizar(false);
  };

  const editar_minhas_api = (id) => {
    const api = nova_api.find(api => api.id === id);
    def_editar_api(api);
    def_exibir_modal_editar(true);
  };

  const excluir_minhas_api = async (id) => {
    try {
      const status = await meu_delete(`apis/${id}`)
      if (status) {
        def_nova_api(tmp => tmp.filter(api => api.id != id));
      } else {
        window.location.href = site;
      }
    } catch (erro) {
      meus_erros(import.meta.url.split('/').pop(), "CAT_EXC_API", erro);
      return false;
    }
  }

  const exibir_modal_minhas_apis = async (api) => {
    def_api_selec(api);
    def_exibir_modal_visualizar(true);
  };

  const fechar_modais_minhas_apis = () => {
    def_api_selec(null);
    def_exibir_modal_editar(false);
    def_exibir_modal_visualizar(false);
    def_api_excluir({ id: null, name: "" })
  }

  return (
    carregando ?
      <Carregamento carregando={carregando} />
      :
      <div id="minhas_apis">
        {/* ------------------ Lista de APIs ------------------ */}
        <div id="lista_minhas_apis">
          {
            !nova_api || nova_api.length === 0 ? (<p>Nenhuma API cadastrada</p>) :
              Array.isArray(nova_api) && nova_api.map(api => (
                <API api={api} key={api.id}
                  click={() => { exibir_modal_minhas_apis(api); }}
                  simples={false}
                  def_api_excluir={def_api_excluir}
                  editar_minhas_api={editar_minhas_api} />
              ))}
        </div>
        {api_excluir.id && (
          <div id="modal_excluir" onClick={() => { fechar_modais_minhas_apis() }}>
            <div id="modal_excluir_conteudo" onClick={e => { e.stopPropagation(); }}>
              <div id="modal_excluir_texto">
                <p>Deseja realmente excluir a API</p>
                <b>{api_excluir.name && api_excluir.name.length > 10 ? api_excluir.name.slice(0, 10) + "..." : api_excluir.name}</b> ?
              </div>
              <div className="campos_laterais">
                <button onClick={() => { fechar_modais_minhas_apis() }}>Cancelar</button>
                <button onClick={() => { excluir_minhas_api(api_excluir.id); fechar_modais_minhas_apis(); }}>Confirmar</button>
              </div>
            </div>
          </div>
        )}
        {/* ------------------ Modais Editar e Visualizar ------------------ */}
        {api_selec && exibir_modal_visualizar && <Visualizador api={api_selec} fechar={fechar_modais_minhas_apis} />}
        {exibir_modal_editar && <Editor fechar={fechar_modais_minhas_apis} cadastrar_minha_api={cadastrar_minhas_apis} atualizar_minha_api={atualizar_minhas_api} dados_minha_api={editar_api} />}
      </div>
  );
};