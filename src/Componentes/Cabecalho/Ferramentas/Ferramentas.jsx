import { useEffect, useState } from "react"
import Buscar from "../Ferramentas/Buscar/Buscar"
import Categorizar from "./Categorizar/Categorizar"
import Tema from "../Ferramentas/Tema/Tema"

export default function Ferramentas({ expandir }) {
 const [expandi_local, def_expandir] = useState("");
 const [filtragem, def_filtragem] = useState({ tipo: "", conteudo: "" });

 useEffect(() => { expandir(expandi_local) }, [expandi_local])

 return (
  <div className="alinhado juntos" style={{flex: "1 1 100%", padding: "0 15px" }}>
   {expandi_local !== "filtrar" && <Buscar expandir={def_expandir} filtragem={def_filtragem} />}
   {expandi_local !== "buscar" && <Categorizar expandir={def_expandir} filtragem={def_filtragem} />}
   {expandi_local === "" && <Tema />}
  </div>
 )
}