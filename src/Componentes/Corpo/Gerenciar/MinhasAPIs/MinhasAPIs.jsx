import React, { useEffect, useState } from "react";
import "../Gerenciar.css";
import "./MinhasAPIs.css";
// import ModalNovaAPI from "./Modal/ModalNovaAPI";
// import ModalApi from "../../../Body/ComponentsBody/Listaapis/ModalApis";
import { validar_token } from "../../../Principais/Servicos/JWT/JWT";
import { meu_delete, meu_get } from "../../../Principais/Servicos/APIs/Conexao";
import { MeusErros } from "../../../Principais/Erros/MeusErros";
import Visualizador from "../../../Modal/API_Visualizador/Visualizador"
import Editor from "../../../Modal/API_Editor/Editor"
import image_padrao from "../../../../assets/image_padrao.png";
import API from "../../API/API";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const MinhasApis = () => {
  const [carregando, def_carregando] = useState(true);
  const [exibir_modal, def_exibir_modal] = useState(false);
  const [nova_api, def_nova_api] = useState([]);
  const [editar_api, def_editar_api] = useState(null);
  const [api_excluir, def_api_excluir] = useState({ id: null, name: "" });
  const [api_selec, def_api_selec] = useState(null);
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
    if (nova_api?.imagem) {
      verificarEValidarImagem(nova_api.imagem).then((img) => setImagem(img));
    }
  }, [nova_api?.imagem]);
  
  useEffect(() => {
    //-------------------------------------------------------------------------------- isso foi criado por causa do ( React.StrictMode do main.jsx) 
    const ultimaRequisicao = sessionStorage.getItem('ultimaRequisicao');
    const tempoAtual = Date.now();

    if (!ultimaRequisicao || tempoAtual - parseInt(ultimaRequisicao) > 10) {
      sessionStorage.setItem('ultimaRequisicao', tempoAtual);
      sessionStorage.setItem("Gerenciar", "ger_apis")
      lista_minhas_apis();
    } else {
      def_carregando(false);
    }
    //-------------------------------------------------------------------------------- so deve ser substituido por listaApis() em Produção!
  }, []);

  useEffect(() => {
    if (api_excluir.id) {
      const teclas = (e) => { if (e.key === "Escape") { fechar_modal_minhas_apis(); } };
      window.addEventListener("keydown", teclas);
      return () => { window.removeEventListener("keydown", teclas); };
    }
  }, [api_excluir.id]);

  useEffect(() => {
    if (!exibir_modal) {
      def_editar_api(null);
    }
  }, [exibir_modal])

  const lista_minhas_apis = async () => {
    try {
      const token = validar_token();
      if (token) {
        const idUser = JSON.parse(atob(token.split('.')[1])).userId;
        const { status_get, dados_get } = await meu_get(`apis/user/${idUser}`, true);
        if (status_get === 204 || status_get !== 200) {
          MeusErros(import.meta.url.split('/').pop(), new Error("LST_API: status " + status_get + " - dados" + dados_get));
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
            cadastrar_minhas_api({
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
      } else {
        sessionStorage.clear();
        remover_token();
        window.location.href = "/AHBFront";
        return;
      }
    } catch (erro) {
      MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_LST_API: ${erro}`));
      return false;
    } finally {
      def_carregando(false); // Quando o JWT é validado, carrega o componente
    }
  }

  const cadastrar_minhas_api = (dadosApi) => {
    def_nova_api(tmp => [...tmp, dadosApi]);
    def_exibir_modal(false);
  };

  const atualizar_minhas_api = (apiEditada) => {
    def_nova_api(tmp => tmp.filter((apis) => apis.id !== apiEditada.id).concat({ ...apiEditada }));
    def_exibir_modal(false);
  };

  const editar_minhas_api = (id) => {
    const api = nova_api.find(api => api.id === id);
    def_editar_api(api);
    def_exibir_modal(true);
  };

  const excluir_minhas_api = async (id) => {
    try {
      const status = await meu_delete(`apis/${id}`)
      if (status) {
        def_nova_api(tmp => tmp.filter(api => api.id != id));
      }
    } catch (erro) {
      MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_EXC_API: ${erro}`));
      return false;
    }
  }

  const exibir_modal_minhas_apis = async (api) => {
    def_api_selec(api);
    def_exibir_modal(true);
  };

  const fechar_modal_minhas_apis = () => {
    def_exibir_modal(false);
    def_api_selec(null);
    def_api_excluir({ id: null, name: "" })
  }

  return (
    <>
      {
        carregando ?
          (<h1 style={{ fontSize: "large", padding: "40px" }}>Carregando...</h1>)
          : (
            <div id="minhas_apis">
              <h1 className="titulos_genrenciar ondulacao-1">Gerenciar suas APIs</h1>
              <button id="nova_api" onClick={() => { def_editar_api(null); def_exibir_modal(true); }}></button>
              <Editor exibir_modal={exibir_modal} fechar={() => def_exibir_modal(false)} nova_api={nova_api} atualizar_minha_api={atualizar_minhas_api} dados_minha_api={editar_api} />
              {/* ------------------ Lista de APIs ------------------ */}
              <div id="lista_minhas_apis">
                {
                  !nova_api || nova_api.length === 0 ? (<p>Nenhuma API cadastrada</p>) :
                    Array.isArray(nova_api) && nova_api.map(api => (
                      <API api={api} key={api.id} click={() => { exibir_modal_minhas_apis(api); }} simples={false} def_api_excluir={def_api_excluir} editar_minhas_api={editar_minhas_api} />
                    ))}
              </div>
              {api_selec && exibir_modal && <Visualizador api={api_selec} fechar={fechar_modal_minhas_apis} />}
              {/* Modal de Confirmação */}
              {api_excluir.id && (
                <div id="modal_excluir" onClick={() => { fechar_modal_minhas_apis() }}>
                  <div id="modal_excluir_conteudo" onClick={e => { e.stopPropagation(); }}>
                    <div id="modal_excluir_texto">
                      <p>Deseja realmente excluir a API</p>
                      <b>{api_excluir.name && api_excluir.name.length > 10 ? api_excluir.name.slice(0, 10) + "..." : api_excluir.name}</b> ?
                    </div>
                    <div className="dois_botoes">
                      <button onClick={() => { fechar_modal_minhas_apis() }}>Cancelar</button>
                      <button onClick={() => { excluir_minhas_api(api_excluir.id); fechar_modal_minhas_apis(); }}>Confirmar</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
      }
    </>
  );
};

export default MinhasApis;