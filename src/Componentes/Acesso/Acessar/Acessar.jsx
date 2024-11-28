import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import SenhaVisivel from "../../../assets/senha_visivel.png"
import SenhaInvisivel from "../../../assets/senha_invisivel.png"
import { remover_token, salvar_token, validar_token } from "../../Principais/Servicos/JWT/JWT"
import { meus_erros } from "../../Principais/Erros/MeusErros";
import { acessar } from "../../Principais/Servicos/Usuario/Acesso";

const inicio = import.meta.env.VITE_INICIAL;
const site = import.meta.env.VITE_SITE;

export default function Acessar() {
  const [resposta_http, def_resposta_http] = useState("");
  const [usuario, def_usuario] = useState("");
  const [senha, def_senha] = useState("");
  const [lembrar_senha, def_lembrar_senha] = useState(false);
  const [usuario_valido, def_usuario_valido] = useState(false);
  const [senha_visivel, def_senha_visivel] = useState(false);
  const [usuario_aviso_erro, def_usuario_aviso_erro] = useState(false);
  const usuario_input_ref = useRef(null);
  const navegar = useNavigate();

  useEffect(() => {
    remover_token();
    sessionStorage.clear();
    usuario_input_ref.current.focus();
  }, []);

  useEffect(() => {
    if (resposta_http.length > 1) {
      const timer = setTimeout(() => { def_resposta_http(""); }, 4000);
      return () => clearTimeout(timer);
    }
  }, [resposta_http]);

  const checagem = () => {
    if (usuario.length > 4) {
      def_usuario_valido(true);
      def_usuario_aviso_erro(false);
    } else {
      def_usuario_valido(false);
      def_usuario_aviso_erro(true);
    }
  };

  const acessando = async () => {
    try {

      const { valido, mensagem } = await acessar(usuario, senha)
      if (valido) {
        window.location.href = site;
      } else {
        if (mensagem) {
          def_resposta_http(mensagem); return;
        } else {
          window.location.href = site;
        }
      }

    } catch (erro) {
      def_resposta_http("Verifique os dados, já está cadastrado?");
      meus_erros(import.meta.url.split('/').pop(), `CAT_ACE_ACS: ${erro}`);
    }
  };

  const enviar = (e) => {
    e.preventDefault();
    
    if (usuario_valido && senha.length >= 8) {
      localStorage.setItem("lembrar_senha", lembrar_senha);
      acessando();
    } else {
      remover_token();
      def_resposta_http("Dados incorretos")
      def_usuario("");
      def_senha("");
    }
  };

  return (
    <div className="dados_usuario_fundo">
      <button onClick={() => { navegar(inicio) }} className="botao_voltar"></button>
      <form onSubmit={enviar} className="dados_usuario_principal">
        <label className="dados_usuario">
          <p className="dados_usuario_titulos">Usuário</p>
          <input
            className={!usuario_valido ? "input-error" : ""}
            onKeyUp={checagem}
            value={usuario || ""}
            onChange={(e) => def_usuario(e.target.value)}
            autoComplete="current-username"
            name="username"
            placeholder="Nome do usuário"
            type="text"
            ref={usuario_input_ref}
            required
          />
        </label>
        <label className="dados_usuario">
          <p className="dados_usuario_titulos">Senha</p>
          <input
            value={senha || ""}
            onChange={(e) => def_senha(e.target.value)}
            type={senha_visivel ? "text" : "password"}
            autoComplete="password"
            placeholder="8 a 14 caracteres"
            required
          />
          <img
            className="dados_usuario_ver_senha"
            src={senha_visivel ? SenhaVisivel : SenhaInvisivel}
            onClick={() => def_senha_visivel(!senha_visivel)}
            alt="Visibilidade"
          />
        </label>
        <label className="dados_usuario_checkbox">
          <input
            className="input_dados_usuario_checkbox"
            type="checkbox"
            onChange={(e) => def_lembrar_senha(e.target.checked)}
            checked={lembrar_senha}
          />
          <span className="span_dados_usuario_checkbox"></span>Lembrar-me
        </label>
        <div className="campos_laterais">
          <button className="botoes_expansiveis" type="button" onClick={() => { sessionStorage.setItem("Acesso", "Criar"); window.location.reload(); }}>Cadastro</button>
          <button className="botoes_expansiveis" type="submit">Entrar</button>
        </div>
        <Link onClick={() => { sessionStorage.setItem("Acesso", "Recuperar"); window.location.reload(); }} to="" style={{ textAlign: "center", color: "var(--cor-principal-destaques)", fontWeight: "bold" }}> Esqueceu sua senha? </Link>
        {resposta_http && (<p className="texto_erro"> {resposta_http} </p>)}
      </form>
    </div>
  );
}