import { useState } from "react";
import Fechar from "../../../../assets/fechar.png"
import Busca from "../../../../assets/busca.png"

export default function Buscar({ expandir, filtragem }) {
 const [expandi_local, def_expandir] = useState("");
 const [busca, def_busca] = useState("");

 return (
  <div className="alinhado">
   {
    expandi_local &&
    <input
    className="expandir"
     style={{ display: expandi_local ? "block" : "none", width: '100%', margin: "0 5px" }}
     onChange={(e) => { def_busca(e.target.value); filtragem({ tipo: "buscar", conteudo: e.target.value }) }}
     placeholder="O que você procura?"
     id="campo_buscar"
     value={busca}
     type="text"
    />
   }

   <img
    onClick={() => { def_expandir(!expandi_local); expandir(!expandi_local ? "buscar" : "");  def_busca(""); filtragem({}) }}
    alt={expandi_local ? "Buscar" : "Fechar pesquisa"}
    src={expandi_local ? Fechar : Busca}
    className="icones"
   />
  </div>
 )
}