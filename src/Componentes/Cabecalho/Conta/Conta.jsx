import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Person from "../../../assets/person.png"
import "./Conta.css"
import { remover_token, validar_token } from "../../Principais/Servicos/JWT/JWT";
import { meu_get } from "../../Principais/Servicos/APIs/Conexao";

export default function Conta() {
 const [menu_visivel, def_menu_visivel] = useState(false);
 const [token_valido, def_token_valido] = useState(false);
 const [usuario, def_usuario] = useState(null);
 const acessarRef = useRef(null);
 const navegar = useNavigate();
 const menuRef = useRef(null);

 useEffect(() => {

  const iniciando = async () => {
   const token = validar_token();
   if (token) {

    def_token_valido(true);
    const id_usuario = JSON.parse(atob(token.split('.')[1])).userId;

    const { status_get, dados_get } = await meu_get(`users/${id_usuario}`, true);

    if (status_get !== 200) { alert("Erro"); def_usuario(null); return; }
    if (dados_get) {
     def_usuario(
      dados_get.publicname ?
       dados_get.publicname.length > 8 ?
        dados_get.publicname.substring(0, 8) + "..." :
        dados_get.publicname
       : null
     )
    }
   } else {
    def_token_valido(false);
   }
  }

  iniciando()

  const clicar_fora_do_menu = e => {
   if (
    menuRef.current && !menuRef.current.contains(e.target) &&
    acessarRef.current && !acessarRef.current.contains(e.target)
   ) { def_menu_visivel(false); }
  };
  document.addEventListener("mousedown", clicar_fora_do_menu);
  return () => { document.removeEventListener("mousedown", clicar_fora_do_menu); };
 }, []);


 return (
  <div id="conta" className="alinhado">
   <button onClick={() => { token_valido ? def_menu_visivel(!menu_visivel) : navegar("/AHBFront/Acesso") }} ref={acessarRef}>
    <img src={Person} alt="Usuário" />
    <span>{usuario ? (usuario || "...") : "Entrar"}</span>
   </button>
   {token_valido && menu_visivel && (
    <div ref={menuRef}>
     <Link to="/AHBFront/Gerenciar/" onClick={
      () => sessionStorage.setItem("Gerenciar", "ger_perfil")}>Perfil</Link>
     <Link to="/AHBFront/Gerenciar/" onClick={
      () => sessionStorage.setItem("Gerenciar", "ger_apis")}>Minhas Apis</Link>
     <Link to="/AHBFront/Gerenciar/" onClick={
      () => sessionStorage.setItem("Gerenciar", "ger_termos")}>Termos</Link>
     <a href="/" onClick={remover_token}>Sair</a>
    </div>
   )}
  </div>
 )
}