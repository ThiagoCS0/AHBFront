import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { remover_token, salvar_token, validar_token } from "../../Principais/Servicos/JWT/JWT"
import { acessar } from "../../Principais/Servicos/Usuario/Acesso";
import { meus_erros } from "../../Principais/Erros/MeusErros";
import Carregamento from "../../Principais/Carregamento/Carregamento";

const inicio = import.meta.env.VITE_INICIAL;
const site = import.meta.env.VITE_SITE;

export default function Acessar() {
  const [usuario_valido, def_usuario_valido] = useState(false);
  const [senha_visivel, def_senha_visivel] = useState(false);
  const [lembrar_senha, def_lembrar_senha] = useState(false);
  const [resposta_http, def_resposta_http] = useState("");
  const [acessando, def_acessando] = useState(false);
  const [usuario, def_usuario] = useState("");
  const [senha, def_senha] = useState("");
  const usuario_input_ref = useRef(null);
  const navegar = useNavigate()

  useEffect(() => {
    remover_token();
    if (usuario_input_ref.current) { usuario_input_ref.current.focus(); }
  }, []);

  useEffect(() => {
    if (resposta_http.length > 1) {
      const timer = setTimeout(() => { def_resposta_http(""); }, 5000);
      return () => clearTimeout(timer);
    }
  }, [resposta_http]);

  const checagem = () => {
    if (usuario.length > 4) {
      def_usuario_valido(true);
    } else {
      def_usuario_valido(false);
    }
  };

  const fazer_acesso = async () => {
    try {

      const { valido, mensagem } = await acessar(usuario, senha)
      if (valido) {
        sessionStorage.setItem("Acessando", true);
        navegar(inicio, { replace: true })
      } else {
        def_acessando(false);
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
    def_acessando(true);
    e.preventDefault();
    if (usuario_valido && senha.length >= 8) {
      localStorage.setItem("lembrar_senha", lembrar_senha);
      fazer_acesso();
    } else {
      remover_token();
      def_resposta_http("Dados incorretos")
      def_usuario("");
      def_senha("");
      def_acessando(false);
    }
  };

  return (
    <div>
      <Link to={inicio} className="botao_voltar"></Link>
      {
        acessando ?
          <Carregamento carregando={acessando} texto="Acessando..." />
          :
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
                src={senha_visivel ? "/icones/senha_visivel.png" : "/icones/senha_invisivel.png"}
                alt={senha_visivel ? "Senha Visível" : "Senha Invisível"}
                onClick={() => def_senha_visivel(!senha_visivel)}
             />
            </label>
            {/* <label className="dados_usuario_checkbox">
              <input
                className="input_dados_usuario_checkbox"
                type="checkbox"
                onChange={(e) => def_lembrar_senha(e.target.checked)}
                checked={lembrar_senha}
              />
              <span className="span_dados_usuario_checkbox"></span>Lembrar-me
            </label> */}
            <p className="texto_erro" style={{ marginBottom: "10px" }}>{resposta_http ? resposta_http : ""}</p>
            <div className="campos_laterais">
              <Link to={site + "Acesso"} onClick={
                () => sessionStorage.setItem("Acesso", "Criar")}
                className="botoes"
              > Cadastro </Link>
              <button className="botoes_expansiveis" type="submit">Entrar</button>
            </div>
            {/* <Link to={site + "Acesso"}
              onClick={() => sessionStorage.setItem("Acesso", "Recuperar")}
              style={{
                textAlign: "center", color: "var(--cor-principal-destaques)",
                fontWeight: "bold"
              }}> Esqueceu sua senha? </Link> */}
          </form>
      }
    </div>
  );
}