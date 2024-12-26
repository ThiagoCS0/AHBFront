import { useEffect, useState } from "react"
import Buscar from "../Ferramentas/Buscar/Buscar"
import Categorizar from "./Categorizar/Categorizar"
import Tema from "../Ferramentas/Tema/Tema"
import Inicio from "./Iniciar/Iniciar";
import "./Ferramentas.css"

const site = import.meta.env.VITE_SITE;

export default function Ferramentas({ expandir, buscar, categorizar }) {
 const [expandi_local, def_expandir] = useState("");

 useEffect(() => { expandir(expandi_local) }, [expandi_local])

 return (
  <div id="ferramentas" className="alinhado juntos">
   {expandi_local === "" && <Inicio />}
   {
    !sessionStorage.getItem("Paginas") && !sessionStorage.getItem("API") &&
    <>
     {expandi_local !== "filtrar" && <Buscar expandir={def_expandir} buscar={buscar} />}
     {expandi_local !== "buscar" && <Categorizar expandir={def_expandir} categorizar={categorizar} />}
    </>
   }
   {expandi_local === "" && <Tema />}
  </div>
 )
}