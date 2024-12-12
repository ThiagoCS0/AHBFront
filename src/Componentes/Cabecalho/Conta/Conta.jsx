import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { remover_token, validar_token } from "../../Principais/Servicos/JWT/JWT";
import { usuario_nome } from "../../Principais/Servicos/Usuario/Usuario";
import "./Conta.css";

const site = import.meta.env.VITE_SITE;

export default function Conta({ dados_offline }) {
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
      const nome = await usuario_nome(false);
      const token = validar_token();
      def_token_valido(token !== null);
      def_usuario(nome);
      if (nome || !token) {
        def_acessando(false);
      }
    };

    iniciando();

    const clicar_fora_do_menu = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        acessarRef.current &&
        !acessarRef.current.contains(e.target)
      ) {
        def_menu_visivel(false);
      }
    };

    document.addEventListener("mousedown", clicar_fora_do_menu);
    return () => {
      document.removeEventListener("mousedown", clicar_fora_do_menu);
    };
  }, []);

  const opcoes_botao_conta = () => {
    if (!acessando) {
      if (token_valido) {
        def_menu_visivel(!menu_visivel);
      } else {
        sessionStorage.clear();
        sessionStorage.setItem("Acesso", "Acessar");
        navegar("Acesso");
      }
    }
  };

  const navegando = (sub_pagina) => {
    switch (sub_pagina) {
      case "MinhasAPIs":
      case "Perfil":
      case "Termos":
        break;
      default:
        return;
    }

    const primeiro_acesso = sessionStorage.getItem("Paginas") == null;

    sessionStorage.setItem("Paginas", sub_pagina);
    window.dispatchEvent(new Event("mudanca_sessionStorage")); // Dispara o evento customizado (usado no Gerenciar)
    if (primeiro_acesso) {
      window.location.reload();
    }
  };

  const sair = () => {
    remover_token();
    sessionStorage.clear();
    def_token_valido(false);
    window.location.href = site;
  };

  return (
    <div id="conta" className="alinhado">
      <button onClick={() => { !dados_offline && opcoes_botao_conta() }} ref={acessarRef} disabled={dados_offline}>
        {!dados_offline && <img src="./icones/person.png" alt="Usuário" />}
        <span>{acessando || dados_offline ? "..." : usuario ? usuario : "Entrar"}</span>
      </button>
      {token_valido && menu_visivel && (
        <div id="conta_menu" ref={menuRef}>
          <Link onClick={() => navegando("Perfil")}>Perfil</Link>
          <Link onClick={() => navegando("MinhasAPIs")}>Minhas APIs</Link>
          <Link onClick={() => navegando("Termos")}>Termos</Link>
          <Link onClick={sair}>Sair</Link>
        </div>
      )}
    </div>
  );
}
