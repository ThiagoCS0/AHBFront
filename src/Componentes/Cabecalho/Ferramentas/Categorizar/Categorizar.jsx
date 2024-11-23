import { useState } from "react"
import Filtro from "../../../../assets/filtro.png"

export default function Categorizar({ expandir, filtragem }) {
 const [expandi_local, def_expandir] = useState("");

 return (
  <div className="alinhado">
   {expandi_local && <select onChange={(e) => { filtragem({ tipo: "categorizar", conteudo: e.target.value }) }} className="expandir">
    <option value="NENHUMA">NENHUMA</option>
    <option value="ARMAZENAMENTO">ARMAZENAMENTO</option>
    <option value="CEP">CEP</option>
    <option value="CLIMA">CLIMA</option>
    <option value="EMPRESAS">EMPRESAS</option>
    <option value="ESTATISTICAS">ESTATISTÍCAS</option>
    <option value="FINANCAS">FINANÇAS</option>
    <option value="PAGAMENTO">PAGAMENTO</option>
    <option value="MAPAS">MAPAS</option>
    <option value="OUTROS">OUTROS</option>
    <option value="REDE_SOCIAIS">REDE SOCIAIS</option>
    <option value="SAUDE">SAÚDE</option>
   </select>
   }
   <img className="icones" src={Filtro} alt="Filtrar" onClick={() => { def_expandir(!expandi_local); expandir(!expandi_local ? "filtrar" : ""); filtragem({}) }} />
  </div>
 )
}