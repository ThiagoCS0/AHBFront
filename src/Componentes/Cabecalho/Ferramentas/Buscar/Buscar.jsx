import { useState } from "react";
import Fechar from "../../../../assets/fechar.png"
import Busca from "../../../../assets/busca.png"

export default function Buscar({ expandir, filtragem }) {
 const [expandi_local, def_expandir] = useState("");
 const [busca, def_busca] = useState("");

 const alterar_buscar = () => {
  expandir(expandi_local ? "" : "buscar");
  def_expandir(!expandi_local);
  if (!expandi_local) {
   setTimeout(() => { document.getElementById("campo_buscar")?.focus(); }, 300);
   filtragem({ tipo: "categorizar", conteudo: "NENHUMA" });
   def_busca("");
  }
 }

 return (
  <div style={{ display: "flex" }} className={expandi_local ? "expandir " : "" + "alinhado"}>
   {
    expandi_local &&
    <input
     className="expandir"
     onChange={(e) => { def_busca(e.target.value); filtragem({ tipo: "buscar", conteudo: e.target.value }) }}
     placeholder="O que você procura?"
     id="campo_buscar"
     value={busca}
     type="text"
    />
   }

   <img
    onClick={alterar_buscar}
    alt={expandi_local ? "Buscar" : "Fechar pesquisa"}
    src={expandi_local ? Fechar : Busca}
    className="icones"
   />
  </div>
 )
}