import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import SenhaVisivel from "../../../assets/senha_visivel.png"
import SenhaInvisivel from "../../../assets/senha_invisivel.png"
import { meu_get, meu_post } from "../../Principais/Servicos/APIs/Conexao";
import { remover_token, salvar_token, validar_token } from "../../Principais/Servicos/JWT/JWT"
import { MeusErros } from "../../Principais/Erros/MeusErros";
import "./Acessar.css"

export default function Acessar() {
  const [httpResposta, defHttpResposta] = useState("");
  const [usuario, defUsuario] = useState("");
  const [senha, defSenha] = useState("");
  const [lembrarSenha, defLembrarSenha] = useState(false);
  const [usuarioValido, defUsuarioValido] = useState(false);
  const [senhaVisivel, defSenhaVisivel] = useState(false);
  const [usuarioAvisoErro, defUsuarioAvisoErro] = useState(false);
  const usuarioInputRef = useRef(null);
  const navegar = useNavigate();

  const Checagem = () => {
    if (usuario.length > 4) {
      defUsuarioValido(true);
      defUsuarioAvisoErro(false);
    } else {
      defUsuarioValido(false);
      defUsuarioAvisoErro(true);
    }
  };

  const enviar = (e) => {
    e.preventDefault();
    if (usuarioValido && senha.length >= 8) {
      localStorage.setItem("lembrarSenha", lembrarSenha);
      acessando();
    } else {
      remover_token();
      defHttpResposta("Dados incorretos")
      defUsuario("");
      defSenha("");
    }
  };

  const acessando = async () => {
    try {
      const { status_post, dados_post } = await meu_post("auth/login", { "username": usuario, "password": senha });

      //const dados = await respostaPost.json();
      if (status_post >= 500) {
        defHttpResposta("Estamos em manutenção!");
        return;
      } else if (status_post >= 400) {
        defHttpResposta("Dados incorretos ou já cadastrados!");
        return;
      } else if (status_post >= 300) {
        return;
      } else if (status_post >= 200 && dados_post) {
        const token_valido = validar_token(dados_post.token);
        if (!token_valido) {
          defHttpResposta("Em manutenção, tente mais tarde!");
          remover_token();
          return;
        }
        salvar_token(dados_post.token);
        const id = JSON.parse(atob(dados_post.token.split('.')[1])).userId;

        const { status_get, dados_get } = await meu_get(`users/${id}`, true);

        if (status_get === 200) {
          window.location.href = "/";
        } else {
          defHttpResposta("Em manutenção");
          return;
        }
      }
    } catch (erro) {
      defHttpResposta("Verifique os dados, já está cadastrado?");
      MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_POS_ACS: ${erro}`));
    }
  };

  useEffect(() => {
    sessionStorage.clear();
    remover_token();
    usuarioInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (httpResposta.length > 1) {
      const timer = setTimeout(() => {
        defHttpResposta("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [httpResposta]);

  return (
    <div id="acessar" className="ondulacao-1">
      <button id="botao_voltar" onClick={() => { navegar("/") }} className="botao_voltar"></button>
      <form onSubmit={enviar}>
        <div className="usuario_form_container">
          <label className="dados_usuario">
            <p className="dados_titulos">Usuário</p>
            <input
              className={!usuarioValido ? "input-error" : ""}
              onKeyUp={Checagem}
              value={usuario || ""}
              onChange={(e) => defUsuario(e.target.value)}
              autoComplete="current-username"
              name="username"
              placeholder="Nome do usuário"
              type="text"
              ref={usuarioInputRef}
              required
            />
          </label>
          <label className="dados_usuario">
            <p className="dados_titulos">Senha</p>
            <input
              value={senha || ""}
              onChange={(e) => defSenha(e.target.value)}
              type={senhaVisivel ? "text" : "password"}
              autoComplete="password"
              placeholder="8 a 14 caracteres"
              required
            />
            <img
              className="ver_senha"
              src={senhaVisivel ? SenhaVisivel : SenhaInvisivel}
              onClick={() => defSenhaVisivel(!senhaVisivel)}
              alt="Visibilidade"
            />
          </label>
          <label className="checkbox_especial">
            <input
              className="input_checkbox_especial"
              type="checkbox"
              onChange={(e) => defLembrarSenha(e.target.checked)}
              checked={lembrarSenha}
            />
            <span className="span_checkbox_especial"></span>Lembrar-me
          </label>
          <div className="campos_laterais">
            <button className="botoes_expansiveis" type="button" onClick={() => { navegar("/Cadastro") }}>Cadastro</button>
            <button className="botoes_expansiveis" type="submit">Entrar</button>
          </div>
          <Link to="/Recuperacao" style={{ textAlign: "center", color: "var(--cor-principal-destaques)", fontWeight: "bold" }}> Esqueceu sua senha? </Link>
          {httpResposta && (<p className="texto_erro"> {httpResposta} </p>)}
        </div>
      </form>
    </div>
  );
}