import { useEffect, useState } from "react";
import Carregamento from "../../../Principais/Carregamento/Carregamento";
import Metodos from "../Metodos/Metodos";
import "./PaginaAPI.css"

const site = import.meta.env.VITE_SITE;

export default function PaginaAPI({ dados_offline, dados_apis }) {
  const [api, def_api] = useState(null);
  const [carregando, def_carregando] = useState(true);

  useEffect(() => {
    const carregar_dados = async () => {
      const dados_salvos = sessionStorage.getItem("API");
      if (dados_salvos && dados_salvos.length > 0) {
        const [id, aba] = JSON.parse(dados_salvos);
        if (dados_apis && dados_apis.length > 0) {
          const dados = dados_apis.find(e => e.id === id);
          if (dados) { def_api(dados) }
          def_carregando(false);
        } else {
          return;
        }
      } else {
        window.location.href = site;
      }
    };
    carregar_dados();
  }, [dados_apis]);

  useEffect(() => {
    const verificar_dados_api = async () => {
      if (!api) { return null; }
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
        {api ?
          <div id="pagina_api_metodos" className="ondulacao-4">
            <Metodos dados_offline={dados_offline} api={api} editar={false} />
          </div>
          :
          <div className="sem_dados">
            <h1>😑 Probleminha 😕</h1>
            <p>Nenhum dado disponível ou ocorreu algum erro!</p>
            <button onClick={() => { sessionStorage.removeItem("API"); window.location.href = site; }}>Ir para o inicio</button>
          </div>
        }
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