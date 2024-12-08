import { useState } from "react";
import Ferramentas from "./Ferramentas/Ferramentas";
import Conta from "./Conta/Conta";
import Logo from "./Logo/Logo";

export default function Cabecalho({ dados_offline, buscar, categorizar }) {

 const tela_grande = window.innerWidth > 1000;
 const [expandir, def_expandir] = useState("");
 
 return (
  <div id="cabecalho">
   {tela_grande ? <Logo /> : expandir === "" ? <Logo /> : <></>}
   <Ferramentas expandir={def_expandir} buscar={buscar} categorizar={categorizar} />
   {tela_grande ? <Conta dados_offline={dados_offline} /> : expandir === "" ? <Conta dados_offline={dados_offline} /> : <></>}
  </div>
 )
}