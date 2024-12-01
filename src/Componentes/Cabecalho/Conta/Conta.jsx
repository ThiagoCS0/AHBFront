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
  const [acessando, def_acessando] = useState(true);
  const [usuario, def_usuario] = useState(null);
  const acessarRef = useRef(null);
  const navegar = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!sessionStorage.getItem("Acessando")) {
      def_acessando(false);
    }
    const iniciando = async () => {
      const nome = await usuario_nome();
      def_token_valido(nome !== null);
      def_usuario(nome)
      if (nome) { def_acessando(false); }
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
    if (!acessando) {
      if (token_valido) {
        def_menu_visivel(!menu_visivel);
      } else {
        sessionStorage.setItem("Acesso", "Acessar");
        navegar("Acesso");
      }
    }
  }

  const navegando = (sub_pagina) => {
    switch (sub_pagina) {
      case "apis": sub_pagina = "ger_apis"; break;
      case "perfil": sub_pagina = "ger_perfil"; break;
      case "termos": sub_pagina = "ger_termos"; break;
    }

    let primeiro_acesso = sessionStorage.getItem("Gerenciar") == null;

    sessionStorage.setItem("Gerenciar", sub_pagina);
    if (primeiro_acesso) { window.location.reload(); }

  }

  const sair = () => {
    remover_token();
    sessionStorage.clear();
    def_token_valido(false);
    window.location.href = site;
  }
  return (
    <div id="conta" className="alinhado">
      <button onClick={opcoes_botao_conta}
        ref={acessarRef}>
        <img src={Person} alt="Usuário" />
        <span>{acessando ? "..." : usuario ? (usuario || "...") : "Entrar"}</span>
      </button>
      {token_valido && menu_visivel && (
        <div id="conta_menu" ref={menuRef}>
          <Link onClick={() => { navegando("perfil") }}>Perfil</Link>
          <Link onClick={() => { navegando("apis") }}>Minhas APIs</Link>
          <Link onClick={() => { navegando("termos") }}>Termos</Link>
          <Link onClick={() => { sair(); }}>Sair</Link>
        </div>
      )
      }
    </div >
  )
}