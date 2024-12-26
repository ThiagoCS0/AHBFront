import { useEffect, useState } from "react";
import { clicar_apis } from "../../Principais/Servicos/APIs/APIs";
import Visualizador from "../../Modal/API_Visualizador/Visualizador";
import Rodape from "../../Rodape/Rodape";
import API from "../API/API";
import "./ListaAPIs.css"

export default function ListaAPIs({ dados_offline, apis }) {
  const [api_selecionada, def_api_selecionada] = useState(null);

  const fecharModal = () => {
    def_api_selecionada(null);
  };

  return (
    <div id="lista_apis">
      <div id="colunas_apis">
        {Array.isArray(apis) && apis.map
          (api => (
            <API
              dados_offline={dados_offline}
              api={api}
              key={api.id}
              classe={"lista_apis_hover"}
              click={() => { def_api_selecionada(api) }}
            />
          ))}
      </div>
      {api_selecionada && <Visualizador dados_offline={dados_offline} api={api_selecionada} fechar={fecharModal} />}
    </div>
  );
}