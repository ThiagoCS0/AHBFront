import { useState } from "react";
import icon_fechar from "./../../../../../src/Recursos/icones/fechar.png";
import icon_buscar from "./../../../../../src/Recursos/icones/busca.png";

export default function Buscar({ expandir, buscar }) {
 const [expandi_local, def_expandir] = useState("");
 const [busca, def_busca] = useState("");

 const alterar_buscar = () => {
  expandir(expandi_local ? "" : "buscar");
  def_expandir(!expandi_local);
  buscar("")
  if (!expandi_local) {
   const aguardando_campo_buscar = setTimeout(() => { document.getElementById("campo_buscar")?.focus(); }, 300);
   def_busca("");
   return () => clearTimeout(aguardando_campo_buscar);
  }
 }

 return (
  <div style={{ display: "flex", maxWidth: "800px" }} className={expandi_local ? "expandir " : "" + "alinhado"}>
   {
    expandi_local &&
    <input
     className="expandir"
     onChange={(e) => { def_busca(e.target.value); buscar(e.target.value) }}
     placeholder="O que você procura?"
     id="campo_buscar"
     value={busca}
     type="text"
    />
   }
   <img
    onClick={alterar_buscar}
    alt={expandi_local ? "Buscar" : "Fechar pesquisa"}
    src={expandi_local ? icon_fechar : icon_buscar}
    className="icones"
   />
  </div>
 )
}