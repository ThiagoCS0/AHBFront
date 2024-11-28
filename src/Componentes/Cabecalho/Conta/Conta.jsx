import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Person from "../../../assets/person.png"
import "./Conta.css"
import { remover_token, validar_token } from "../../Principais/Servicos/JWT/JWT";
import { meu_get } from "../../Principais/Servicos/APIs/Conexao";
import { usuario_id, usuario_nome } from "../../Principais/Servicos/Usuario/Usuario";


const inicio = import.meta.env.VITE_INICIAL;

export default function Conta() {
  const [menu_visivel, def_menu_visivel] = useState(false);
  const [token_valido, def_token_valido] = useState(false);
  const [usuario, def_usuario] = useState(null);
  const acessarRef = useRef(null);
  const navegar = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {

    const iniciando = async () => {
      const nome = await usuario_nome();
      def_token_valido(nome !== "");
      def_usuario(nome)
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

  const opcoes_botao_conta = () => {
    if (token_valido) {
      def_menu_visivel(!menu_visivel);
    } else {
      sessionStorage.setItem("Acesso", "Acessar");
      navegar("Acesso");
    }
  }


  return (
    <div id="conta" className="alinhado">
      <button onClick={opcoes_botao_conta}
        ref={acessarRef}>
        <img src={Person} alt="Usuário" />
        <span>{usuario ? (usuario || "...") : "Entrar"}</span>
      </button>
      {token_valido && menu_visivel && (
        <div ref={menuRef}>
          <Link to="Gerenciar" onClick={
            () => sessionStorage.setItem("Gerenciar", "ger_perfil")}>Perfil</Link>
          <Link to="Gerenciar" onClick={
            () => sessionStorage.setItem("Gerenciar", "ger_apis")}>Minhas Apis</Link>
          <Link to="Gerenciar" onClick={
            () => sessionStorage.setItem("Gerenciar", "ger_termos")}>Termos</Link>
          <a href={inicio} onClick={() => { remover_token(); def_token_valido(false); }}>Sair</a>
        </div>
      )}
    </div>
  )
}