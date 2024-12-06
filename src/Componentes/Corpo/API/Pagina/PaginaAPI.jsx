import { useEffect, useState } from "react";
import Carregamento from "../../../Principais/Carregamento/Carregamento";
import "./PaginaAPI.css"
import Metodos from "../Metodos/Metodos";
import { meu_get } from "../../../Principais/Servicos/Backend/Conexao";

const site = import.meta.env.VITE_SITE;

export default function PaginaAPI() {
  const [api, def_api] = useState(null);
  const [carregando, def_carregando] = useState(true);
  const [publicador, def_publicador] = useState("");
  const [aba_ativa, def_aba_ativa] = useState("");

  useEffect(() => {
    const carregar_dados = async () => {
      const dados_salvos = sessionStorage.getItem("API");

      if (dados_salvos) {
        const [id, aba] = JSON.parse(dados_salvos);
        const { status_get, dados_get } = await meu_get(`apis/${id}`)
        if (Math.floor(status_get / 100) === 2) {
          dados_get.methods = JSON.parse(dados_get.methods)
          def_api(dados_get);
          def_aba_ativa(aba);
          def_carregando(false);
        }
      } else {
        window.location.href = site;
      }
    };

    carregar_dados();
  }, []);

  useEffect(() => {
    const verificar_dados_api = async () => {
      if (!api) { return null; }

      def_publicador('')
      if (api.publicador && api.publicador != "undefined") {
        const { status_get, dados_get } = await meu_get(`users/${api.publicador}/nome-publico`);
        if (!status_get && !dados_get) { window.location.href = site; }
        if (dados_get) { def_publicador(dados_get.publicName); }
      }
      def_carregando(false);
    }

    verificar_dados_api();

    const tecla = (e) => { if (e.key === "Escape") { fechar(); } };
    window.addEventListener("keydown", tecla);
    return () => { window.removeEventListener("keydown", tecla); };
  }, [api])

  return (
    carregando ? (
      <Carregamento carregando={carregando} />
    ) : (
      <div id="pagina_api">
        {api ? (
          <>
            <div id="pagina_api_metodos">
              <Metodos api={api} />
            </div>
          </>
        ) : (
          <div className="sem_dados">
            <h1>😑 Probleminha 😕</h1>
            <p>Nenhum dado disponível ou ocorreu algum erro!</p>
            <button onClick={() => { sessionStorage.removeItem("API"); window.location.href = site; }}>Ir para o inicio</button>
          </div>
        )}
      </div>
    )
  );
}




// ------------------------- COM AUTENTICAÇÃO
// try {
//  if (sessionStorage.getItem("API")) {
//   const api_json = JSON.parse(sessionStorage.getItem("API"));
//   const { status_get, dados_get } = await meu_get(`apis/${api_json.id}`, true);

//   if (Math.floor(status_get / 100) === 2) { def_api(dados_get); }
//  }
// } catch (erro) {
//  meus_erros(import.meta.url.split('/').pop(), "CAT_PGAPI_DDAPI: " + erro);
// }