import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Person from "../../../assets/person.png"
import "./Conta.css"
import { remover_token } from "../../Principais/Servicos/JWT/JWT";

export default function Conta({ token_valido, usuario }) {
 const [menu_visivel, def_menu_visivel] = useState(false);
 const acessarRef = useRef(null);
 const navegar = useNavigate();
 const menuRef = useRef(null);

 useEffect(() => {
  const clicar_fora = e => {
   if (
    menuRef.current && !menuRef.current.contains(e.target) &&
    acessarRef.current && !acessarRef.current.contains(e.target)
   ) { def_menu_visivel(false); }
  };
  document.addEventListener("mousedown", clicar_fora);
  return () => { document.removeEventListener("mousedown", clicar_fora); };
 }, []);

 return (
  <div id="conta" className="alinhado">
   <button onClick={() => { token_valido ? def_menu_visivel(!menu_visivel) : navegar("/Acesso") }} ref={acessarRef}>
    <img src={Person} alt="Usuário" />
    <span>{token_valido ? (usuario || "...") : "Entrar"}</span>
   </button>
   {token_valido && menu_visivel && (
    <div ref={menuRef}>
     <Link to="/Gerenciar/" onClick={
      () => sessionStorage.setItem("Gerenciar", "ger_perfil")}>Perfil</Link>
     <Link to="/Gerenciar/" onClick={
      () => sessionStorage.setItem("Gerenciar", "ger_apis")}>Minhas Apis</Link>
     <Link to="/Gerenciar/" onClick={
      () => sessionStorage.setItem("Gerenciar", "ger_termos")}>Termos</Link>
     <a href="/" onClick={remover_token}>Sair</a>
    </div>
   )}
  </div>
 )
}