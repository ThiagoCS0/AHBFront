import Logo from "./Logo/Logo";
import Ferramentas from "./Ferramentas/Ferramentas";
import Conta from "./Conta/Conta";
import { useState } from "react";

export default function Cabecalho({ buscar, categorizar }) {
 const tela_grande = window.screen.width > 1000;
 const [expandir, def_expandir] = useState("");

 return (
  <div id="cabecalho">
   {tela_grande ? <Logo /> : expandir === "" ? <Logo /> : <></>}
   <Ferramentas expandir={def_expandir} buscar={buscar} categorizar={categorizar}/>
   {tela_grande ? <Conta /> : expandir === "" ? <Conta /> : <></>}
  </div>
 )
}