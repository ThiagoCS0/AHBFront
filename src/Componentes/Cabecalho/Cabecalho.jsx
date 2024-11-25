import Logo from "./Logo/Logo";
import Ferramentas from "./Ferramentas/Ferramentas";
import Conta from "./Conta/Conta";
import { useEffect, useState } from "react";
import { remover_token, validar_token } from "../Principais/Servicos/JWT/JWT";
import { MeusErros } from "../Principais/Erros/MeusErros";
import { meu_get } from "../Principais/Servicos/APIs/Conexao";

export default function Cabecalho({ buscar, categorizar }) {
 const [token_valido, def_token_valido] = useState(false);
 const tela_grande = window.screen.width > 1000;
 const [expandir, def_expandir] = useState("");
 const [usuario, def_usuario] = useState("");

 useEffect(() => {
  const iniciando = async () => {
   try {
    const token = validar_token()
    if (token) {
     def_token_valido(true);
     const id = JSON.parse(atob(token.split('.')[1])).userId;

     const { status_get, dados_get } = await meu_get(`users/${id}`, true);
     if (status_get !== 200) { return; }
     if (dados_get) {
      if (dados_get.length < 1) { novo_acesso(); }
      if (dados_get.publicname) { def_usuario(dados_get.publicname.length > 8 ? dados_get.publicname.substring(0, 8) + "..." : dados_get.publicname); }
     } else {
      novo_acesso();
     }
    }
   } catch (erro) {
    MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_GET_USU: ${erro.message}`));
    novo_acesso();
   }
  }
  iniciando();
 }, []);

 const novo_acesso = () => {
  remover_token();
  window.location.href = "/";
 }

 return (
  <div id="cabecalho">
   {tela_grande ? <Logo /> : expandir === "" ? <Logo /> : <></>}
   <Ferramentas expandir={def_expandir} />
   {tela_grande ? <Conta token_valido={token_valido} usuario={usuario} /> : expandir === "" ? <Conta /> : <></>}
  </div>
 )
}