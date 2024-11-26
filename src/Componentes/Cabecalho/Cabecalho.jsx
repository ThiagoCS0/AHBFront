import Logo from "./Logo/Logo";
import Ferramentas from "./Ferramentas/Ferramentas";
import Conta from "./Conta/Conta";
import { useEffect, useState } from "react";
import { remover_token, validar_token } from "../Principais/Servicos/JWT/JWT";
import { MeusErros } from "../Principais/Erros/MeusErros";
import { meu_get } from "../Principais/Servicos/APIs/Conexao";

export default function Cabecalho({ buscar, categorizar }) {
 const tela_grande = window.screen.width > 1000;
 const [expandir, def_expandir] = useState("");

 return (
  <div id="cabecalho">
   {tela_grande ? <Logo /> : expandir === "" ? <Logo /> : <></>}
   <Ferramentas expandir={def_expandir} />
   {tela_grande ? <Conta /> : expandir === "" ? <Conta /> : <></>}
  </div>
 )
}