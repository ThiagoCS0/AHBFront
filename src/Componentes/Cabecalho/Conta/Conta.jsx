import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Person from "../../../assets/person.png"
import "./Conta.css"
import { remover_token, validar_token } from "../../Principais/Servicos/JWT/JWT";
import { meu_get } from "../../Principais/Servicos/APIs/Conexao";
import { usuario_id, usuario_nome } from "../../Principais/Servicos/Usuario/Usuario";


const inicio = import.meta.env.VITE_INICIAL;
const site = import.meta.env.VITE_SITE;

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


  const navegando = (sub_pagina) => {
    switch (sub_pagina) {
      case "perfil": sub_pagina = "ger_perfil"; break;
      case "apis": sub_pagina = "ger_perfil"; break;
      case "termos": sub_pagina = "ger_termos"; break;
    }
    sessionStorage.setItem("Gerenciar", sub_pagina);
    window.location.href = "Gerenciar";
  }

return (
  <div id="conta" className="alinhado">
    <button onClick={opcoes_botao_conta}
      ref={acessarRef}>
      <img src={Person} alt="Usuário" />
      <span>{usuario ? (usuario || "...") : "Entrar"}</span>
    </button>
    {token_valido && menu_visivel && (
      <ul id="conta_menu" ref={menuRef}>
        <li onClick={() => { navegando("perfil") }}>Perfil</li>
        <li onClick={() => { navegando("apis") }}>Minhas APIs</li>
        <li onClick={() => { navegando("termos") }}>Termos</li>
        <li onClick={() => { remover_token(); def_token_valido(false); }}>Sair</li>
      </ul>
    )
    }
  </div >
)
}