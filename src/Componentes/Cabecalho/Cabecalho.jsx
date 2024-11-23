import Logo from "./Logo/Logo";
import Ferramentas from "./Ferramentas/Ferramentas";
import Conta from "./Conta/Conta";
import { useEffect, useState } from "react";
import { removerToken, validarToken } from "../Principais/Servicos/JWT/JWT";
import { Erros } from "../Principais/Erros/Erros";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Cabecalho() {
 const [token_valido, def_token_valido] = useState(false);
 const tela_grande = window.screen.width > 1000;
 const [expandir, def_expandir] = useState("");
 const [usuario, def_usuario] = useState("");

 useEffect(() => {
  const iniciando = async () => {
   try {
    const token = validarToken()
    if (token) {
     def_token_valido(true);
     const id = JSON.parse(atob(token.split('.')[1])).userId
     const resposta = await fetch(`${API_URL}/users/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
     });
     if (!resposta.ok) { acessar_novamente(); }
     const dados = await resposta.json();
     if (dados) {
      if (dados.length < 1) { acessar_novamente(); }
      if (dados.publicname) { def_usuario(dados.publicname.length > 8 ? dados.publicname.substring(0, 8) + "..." : dados.publicname); }
     } else {
      acessar_novamente();
     }
    }
   } catch (error) {
    Erros(import.meta.url.split('/').pop(), error);
    acessar_novamente();
   }
  }
  iniciando();
 }, []);

 const acessar_novamente = () => {
  removerToken();
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