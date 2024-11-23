import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Person from "../../../assets/person.png"
import "./Conta.css"
import { removerToken } from "../../Principais/Servicos/JWT/JWT";

export default function Conta({ token_valido, usuario }) {
 const [menu_visivel, def_menu_visivel] = useState(false);
 const acessarRef = useRef(null);
 const navegar = useNavigate();
 const menuRef = useRef(null);


 return (
  <div id="conta" className="alinhado">
   <button onClick={() => { token_valido ? def_menu_visivel(!menu_visivel) : navegar("/Acesso") }} ref={acessarRef}>
    <img src={Person} alt="Usuário" />
    <span>{token_valido ? (usuario || "...") : "Entrar"}</span>
   </button>
   {token_valido && menu_visivel && ( 
    <div ref={menuRef}>
     <Link to="/Gerenciar/" onClick={
      () => sessionStorage.setItem("Gerenciar", "Perfil")}>Perfil</Link>
     <Link to="/Gerenciar/" onClick={
      () => sessionStorage.setItem("Gerenciar", "Gerenciar APIs")}>Minhas Apis</Link>
     <Link to="/Gerenciar/" onClick={
      () => sessionStorage.setItem("Gerenciar", "Termos de Uso")}>Termos</Link>
     <a href="/" onClick={removerToken}>Sair</a>
    </div>
   )}
  </div>
 )
}