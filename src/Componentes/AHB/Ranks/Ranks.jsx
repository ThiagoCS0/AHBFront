import { useEffect, useState } from "react";
import Abas from "../../Principais/Abas/Abas";
import { validar_imagem } from "../../Principais/Servicos/APIs/APIs";
import "./Rank.css"
import Visualizador from "../../Modal/API_Visualizador/Visualizador";

export default function Ranks({ dados_offline, aba, apis }) {
  const pagina_api = (id) => {
    sessionStorage.removeItem("Paginas");
    sessionStorage.setItem("API", JSON.stringify([id, "basico"]));
    window.location.reload();
  };

  return (
    <Abas
      pai="ranks"
      titulos={[
        { nome: "+ Populares", conteudo: "ranks_populares" },
        { nome: "+ Recentes", conteudo: "ranks_recentes" },
      ]}
      conteudos={[
        <>
          {
            apis
              .sort((a, b) => b.cliques - a.cliques)
              .map((api, index) => {
                return (
                  <APIsRank
                    key={index}
                    api={api}
                    tipo={"populares"}
                    dados_offline={dados_offline}
                  />
                )
              })
          }
        </>,
        <>
          {
            apis
              .sort((a, b) => new Date(a.data) - new Date(b.data))
              .map((api, index) => {
                const lado = index % 2 === 0;
                return (
                  <APIsRank
                    key={index}
                    api={api}
                    lado={lado}
                    tipo={"recentes"}
                    dados_offline={dados_offline}
                    pagina_api={pagina_api}
                  />
                );
              })}
        </>,
      ]}
      ids_conteudos={["ranks_populares", "ranks_recentes"]}
      aba={aba}
    />
  );
}


function APIsRank({ api, lado, tipo, dados_offline, pagina_api }) {
  const [imagem, def_imagem] = useState(dados_offline?`./apis/${api.imagem}.png`:'./apis/imagem_padrao.png');
  const [api_selecionada, def_api_selecionada] = useState(null);

  useEffect(() => {
    const carregar_imagem = async () => {
      if (!dados_offline) {
        const nova_imagem = await validar_imagem(api.imagem, dados_offline);
        def_imagem(nova_imagem);
      }
    };
    carregar_imagem();
  }, [api.imagem, dados_offline]);

  const [ano, mes, dia] = api.data.split("T")[0].split("-");
  
  if (!dia && !mes && !ano) return null;

  const fecharModal = () => {
    def_api_selecionada(null);
  };
  
  return (
    <>
      {tipo == "populares" ?
        <div className="ranks_apis_populares ondulacao-6" onClick={() => { def_api_selecionada(api) }}>
          <p>{api.nome}</p>
          <p>{api.cliques}</p>
          <img src={imagem} alt={api.nome} />
        </div>
        :
        <div
          className="ranks_apis_recentes"
          style={{
            justifyContent: lado ? "start" : "end",
            alignSelf: lado ? "flex-start" : "flex-end",
          }}
        >
          <div className="ondulacao-5" style={{ order: lado ? 2 : 0 }} onClick={() => { def_api_selecionada(api) }}>
            <img alt={`Imagem da API ${api.nome}`} src={imagem} style={{ order: lado ? 0 : 1 }} />
            <div style={{ order: lado ? 1 : 0 }}>
              {api.nome.length > 12 ? <p>{api.nome.slice(0, 12)}...</p> : <p>{api.nome}</p>}
              <p>{dia + " / " + mes + " / " + ano}</p>
            </div>
          </div>
        </div>
      }
      {api_selecionada && <Visualizador dados_offline={dados_offline} api={api_selecionada} fechar={fecharModal} />}
    </>
  );
}