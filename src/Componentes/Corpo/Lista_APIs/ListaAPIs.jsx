import { useState } from "react";
import { clicar_apis } from "../../Principais/Servicos/APIs/APIs";
import Visualizador from "../../Modal/API_Visualizador/Visualizador";
import Rodape from "../../Rodape/Rodape";
import API from "../API/API";
import "./ListaAPIs.css"

export default function ListaAPIs({ dados_offline, apis }) {
  const [apiSelec, defApiSelec] = useState(null);
  const fecharModal = () => {
    defApiSelec(null);
  };

  return (
    <div id="lista_apis">
      <div id="colunas_apis">
        {Array.isArray(apis) && apis.map
          (api => (
            <API
              api={api}
              key={api.id}
              classe={"lista_apis_hover"}
              click={() => { defApiSelec(api); }}
            />
          ))}
      </div>
      {apiSelec && <Visualizador dados_offline={dados_offline} api={apiSelec} fechar={fecharModal} />}
    </div>
  );
}