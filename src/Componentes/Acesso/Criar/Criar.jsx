import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SenhaVisivel from "../../../assets/senha_visivel.png"
import SenhaTnvisivel from "../../../assets/senha_invisivel.png"
import { meu_post } from "../../Principais/Servicos/APIs/Conexao";
import { cadastrar } from "../../Principais/Servicos/Usuario/Acesso";
import { meus_erros } from "../../Principais/Erros/MeusErros";
import { remover_token, salvar_token, validar_token } from "../../Principais/Servicos/JWT/JWT";

const inicio = import.meta.env.VITE_INICIAL;

export default function Criar() {
  const [lembrar_senha, def_lembrar_senha] = useState(false);
  const [senha_visivel, def_senha_visivel] = useState(false);
  const [resposta_http, def_resposta_http] = useState("");
  const [nome_publico, def_nome_publico] = useState("");
  const [telefone, def_telefone] = useState("");
  const [login, def_login] = useState("");
  const [senha, def_senha] = useState("");
  const [email, def_email] = useState("");
  const [ddd, def_ddd] = useState("");
  const [cpf, def_cpf] = useState("");

  const [erros, def_erros] = useState({
    login_erro: false,
    nome_publico_erro: false,
    cpf_erro: false,
    email_erro: false,
    ddd_erro: false,
    telefone_erro: false,
    senha_erro: false,
  });

  const [validacoes, def_validacoes] = useState({
    login_validar: false,
    nome_publico_validar: false,
    cpf_validar: false,
    email_validar: false,
    ddd_validar: false,
    telefone_validar: false,
    senha_validar: false,
  });

  const ddd_validos = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41',
    '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '68', '69', '71',
    '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '88', '91', '93', '94', '96', '97', '98', '99'
  ];

  const validar_campos = () => {
    const novos_erros = { ...erros };
    const novas_validacoes = { ...validacoes };
    // Validação do login
    if (login.length > 5 && /^[a-zA-Z0-9]+$/.test(login)) {
      novas_validacoes.login_validar = true;
      novos_erros.login_erro = false;
    } else {
      novas_validacoes.login_validar = false;
      novos_erros.login_erro = login.length > 0;
    }
    // Validação do nome público
    if (nome_publico.length > 4) {
      novas_validacoes.nome_publico_validar = true;
      novos_erros.nome_publico_erro = false;
    } else {
      novas_validacoes.nome_publico_validar = false;
      novos_erros.nome_publico_erro = nome_publico.length > 0;
    }
    // Validação do CPF
    const cpfNumeros = cpf.replace(/[.\-]/g, '');
    if (/^\d{11}$/.test(cpfNumeros)) {
      novas_validacoes.cpf_validar = true;
      novos_erros.cpf_erro = false;
    } else {
      novas_validacoes.cpf_validar = false;
      novos_erros.cpf_erro = cpf.length > 0;
    }
    // Validação do email
    if (/\S+@\S+\.\S+/.test(email)) {
      novas_validacoes.email_validar = true;
      novos_erros.email_erro = false;
    } else {
      novas_validacoes.email_validar = false;
      novos_erros.email_erro = email.length > 0;
    }
    // Validação do DDD
    if (/^\d{2}$/.test(ddd) && ddd_validos.includes(ddd)) {
      novas_validacoes.ddd_validar = true;
      novos_erros.ddd_erro = false;
    } else {
      novas_validacoes.ddd_validar = false;
      novos_erros.ddd_erro = ddd.length > 0;
    }
    // Validação do telefone
    const telefoneNumeros = telefone.replace(/\D/g, ''); // Remove tudo que não for número
    if (/^\d{8,9}$/.test(telefoneNumeros) && telefoneNumeros.length === telefone.length) {
      novas_validacoes.telefone_validar = true;
      novos_erros.telefone_erro = false;
    } else {
      novas_validacoes.telefone_validar = false;
      novos_erros.telefone_erro = telefone.length > 0;
    }
    // Validação da senha
    if (senha.length >= 8 && senha.length <= 14) {
      novas_validacoes.senha_validar = true;
      novos_erros.senha_erro = false;
    } else {
      novas_validacoes.senha_validar = false;
      novos_erros.senha_erro = senha.length > 0;
    }
    def_erros(novos_erros);
    def_validacoes(novas_validacoes);
  };

  const acessar = async () => {
    try {
      const { status_post, dados_post } = await meu_post("auth/login", {
        "username": login,
        "password": senha
      });

      if (status_post !== 200) {
        meus_erros(import.meta.url.split('/').pop(), "CRI_ACS_INV");
        return;
      }

      salvar_token(dados_post.token)

    } catch (erro) {
      window.location.href = "/";
      meus_erros(import.meta.url.split('/').pop(), "CAT_CRI_ACS", erro);
      return;
    }
  };

  useEffect(() => {
    validar_campos();
  }, [login, nome_publico, cpf, email, ddd, telefone, senha]);

  useEffect(() => {
    if (resposta_http) {
      const timer = setTimeout(() => { def_resposta_http(''); }, 4000);
      return () => clearTimeout(timer);
    }
  }, [resposta_http]);

  const cadastro = async () => {
    const { valido, mensagem } = await cadastrar({
      "username": login,
      "publicname": nome_publico,
      "cpf": cpf,
      "email": email,
      "phone": `${ddd}${telefone}`,
      "password": senha
    })

    if (!valido) {
      def_resposta_http(mensagem);
      return;
    } else {
      redefinirCampos();
      window.location.href = inicio;
    }
  }
  const enviar = (e) => {
    e.preventDefault();
    def_resposta_http('');
    remover_token();
    if (Object.values(validacoes).every(Boolean)) {
      cadastro();
    }
  };

  const redefinirCampos = () => {
    def_nome_publico("");
    def_cpf("");
    def_email("");
    def_ddd("");
    def_telefone("");
    def_senha("");
    def_validacoes({
      nome_publico_validar: false,
      cpf_validar: false,
      email_validar: false,
      ddd_validar: false,
      telefone_validar: false,
      senha_validar: false,
    });
  };

  return (
    <div className="dados_usuario_fundo">
      <Link to="/Acesso" onClick={() => sessionStorage.setItem("Acesso", "Acessar")} className="botao_voltar"></Link>
      <form onSubmit={enviar} className="dados_usuario_principal">
        <label className="dados_usuario">
          <p className="dados_usuario_titulos">Usuário (Para acessar conta)</p>
          <input
            className={erros.login_erro ? "aviso_erro_borda" : ""}
            onChange={(e) => def_login(e.target.value)}
            autoComplete="login"
            placeholder="Login"
            value={login || ""}
            id="login"
            required
          />
          <span className="aviso_erro">{erros.login_erro ? (!/^[a-zA-Z0-9]+$/.test(login) ? "Permitido apenas letras e/ou números" : "Deve ter mais de 5 caracteres") : ""}</span>
        </label>

        <label className="dados_usuario">
          <p className="dados_usuario_titulos">Nome (visivel a todos)</p>
          <input
            className={erros.nome_publico_erro ? "aviso_erro_borda" : ""}
            onChange={(e) => def_nome_publico(e.target.value)}
            autoComplete="name"
            placeholder="Nome público"
            value={nome_publico || ""}
            id="nomePublico"
            required
          />
          <span className="aviso_erro">{erros.nome_publico_erro ? "Deve ter mais de 4 caracteres" : ""}</span>
        </label>

        <label className="dados_usuario">
          <p className="dados_usuario_titulos">CPF</p>
          <input
            className={erros.cpf_erro ? "aviso_erro_borda" : ""}
            value={cpf || ""}
            onChange={(e) => def_cpf(e.target.value)}
            autoComplete="cpf"
            placeholder="00000000000"
            required
          />
          <span className="aviso_erro">{erros.cpf_erro ? "Digite um CPF válido" : ""}</span>
        </label>

        <label className="dados_usuario">
          <p className="dados_usuario_titulos">Email</p>
          <input
            className={erros.email_erro ? "aviso_erro_borda" : ""}
            value={email || ""}
            onChange={(e) => def_email(e.target.value)}
            autoComplete="email"
            placeholder="seu@email.com"
            required
          />
          <span className="aviso_erro">{erros.email_erro ? "Digite um email válido" : ""}</span>
        </label>

        <label className="dados_usuario">
          <p className="dados_usuario_titulos">Telefone</p>
          <div className="dados_usuario_tel">
            <input
              className={erros.ddd_erro ? "aviso_erro_borda" : ""}
              value={ddd || ""}
              onChange={(e) => {
                def_ddd(e.target.value);
                if (e.target.value.length >= 2) { document.getElementById("telefone").focus(); }
              }}
              autoComplete="DDD"
              placeholder="00"
              required
            />
            <input
              id="telefone"
              className={erros.telefone_erro ? "aviso_erro_borda" : ""}
              value={telefone || ""}
              onChange={(e) => def_telefone(e.target.value)}
              autoComplete="tel"
              placeholder="000000000"
              required
            />
          </div>
          <span className="aviso_erro">{erros.telefone_erro ? "Número de telefone inválido" : ""}</span>
        </label>

        <label className="dados_usuario">
          <p className="dados_usuario_titulos">Senha</p>
          <input
            className={erros.senha_erro ? "aviso_erro_borda" : ""}
            value={senha || ""}
            onChange={(e) => def_senha(e.target.value)}
            type={senha_visivel ? "text" : "password"}
            autoComplete="password"
            placeholder="8 a 14 caracteres"
          />
          <img
            className="dados_usuario_ver_senha"
            src={senha_visivel ? SenhaVisivel : SenhaTnvisivel}
            onClick={() => def_senha_visivel(!senha_visivel)}
            alt="Visibilidade"
          />
          <span className="aviso_erro">{erros.senha_erro ? "Deve ter entre 8 e 14 caracteres" : ""}</span>
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
        <button className="botoes_expansiveis" type="submit"> Cadastrar </button>
        {resposta_http && (<p className="texto_erro"> {resposta_http} </p>)}
      </form>
    </div>
  );
}