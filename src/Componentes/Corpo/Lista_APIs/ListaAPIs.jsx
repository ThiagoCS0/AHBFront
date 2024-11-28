import { useState } from "react";
import { clicar_apis } from "../../Principais/Servicos/APIs/APIs";
import "./ListaAPIs.css"
import Visualizador from "../../Modal/API_Visualizador/Visualizador";
import API from "../API/API";

export default function ListaAPIs({ apis }) {
 const [apiSelec, defApiSelec] = useState(null);

 const fecharModal = () => {
  defApiSelec(null);
 };

 return (
  <div id="lista_apis">
   <div id="colunas_apis">
    {Array.isArray(apis) && apis.map
     ((api) => (
      <API
       api={api}
       key={api.id}
       classe={"lista_apis_hover"}
       click={() => {
        defApiSelec(api)
       }}
      />
     ))}
   </div>
   {apiSelec && <Visualizador api={apiSelec} fechar={fecharModal} />}
  </div>
 );
}