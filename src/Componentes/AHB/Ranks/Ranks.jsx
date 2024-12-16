import Abas from "../../Principais/Abas/Abas";

export default function Ranks({ dados_offiline, aba, apis }) {

  const pagina_api = (id) => {
    sessionStorage.removeItem("Paginas")
    sessionStorage.setItem("API", JSON.stringify([id, "basico"]))
    window.location.reload();
  }

  return (
    <Abas
      pai="ranks"
      titulos={[
        // { nome: "+ Populares", conteudo: "ranks_populares" },
        { nome: "+ Recentes", conteudo: "ranks_recentes" }
      ]}
      conteudos={[
        // <>
        //   <div>
        //     <h1>APIs + Populares</h1>
        //   </div>
        //   <p>
        //     Conheça as APIs mais acessadas e utilizadas pela comunidade. Essas são as favoritas, provando sua relevância e utilidade em diversos projetos.
        //   </p>
        // </>,
        ,<>
          {apis.map((api, index) => {
            const lado = index % 2 === 0;
            const [dia, mes, ano] = api.data.split(' ')[0].split('/')
            return (
              <div className="ranks_apis" key={index} style=
                {{
                  justifyContent: lado ? "start" : "end",
                  alignSelf: lado ? "flex-start" : "flex-end",
                  padding: `10px ${lado ? "0" : "10px"} 10px ${lado ? "10px" : "0px"}`
                }}
                onClick={() => { pagina_api(api.id) }}>
                <hr className="ondulacao-5" />
                <div style={{ order: lado ? 2 : 0 }}>
                  <p>{mes + " / " + ano}</p>
                  <div>
                    
                  </div>
                </div>
                <img
                  alt={`Imagem da API ${api.nome}`}
                  src={dados_offiline ? `./apis/${api.imagem}.png` : api.imagem || ""}
                />
              </div>
            );
          })}
        </>,
      ]}
      ids_conteudos={["ranks_populares", "ranks_recentes"]}
      aba={aba}
    />
  );
}