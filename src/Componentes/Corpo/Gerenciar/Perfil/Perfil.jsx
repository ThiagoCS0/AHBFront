import { useEffect, useState } from "react";
import { validar_token } from "../../../Principais/Servicos/JWT/JWT";
import { meu_get, meu_put } from "../../../Principais/Servicos/APIs/Conexao";
import { MeusErros } from "../../../Principais/Erros/MeusErros";
import SenhaInvisivel from "../../../../assets/senha_invisivel.png"
import SenhaVisivel from "../../../../assets/senha_visivel.png"
import "./Perfil.css"

const site = import.meta.env.VITE_BACKEND_SITE;

export default function Perfil() {
  const [carregando, def_carregando] = useState(true);
  const [userData, setUserData] = useState({ login: "", nomePublico: "", cpf: "", email: "", ddd: "", telefone: "", senhaAtual: "", novaSenha: "", });
  const [visibilidade_senha, def_visibilidade_senha] = useState({ senhaAtual: false, novaSenha: false, });
  const [visibilidade_nova_senha, def_visibilidade_nova_senha] = useState(false);

  const DDDValidos = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41",
    "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "68", "69", "71",
    "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "88", "91", "93", "94", "96", "97", "98", "99"
  ];

  const [erros, def_erros] = useState({
    loginErro: false,
    nomePublicoErro: false,
    cpfErro: false,
    emailErro: false,
    dddErro: false,
    telefoneErro: false,
    senhaErro: false,
  });

  const [validacoes, def_validacoes] = useState({
    loginValidar: false,
    nomePublicoValidar: false,
    cpfValidar: false,
    emailValidar: false,
    DDDValidar: false,
    telefoneValidar: false,
    senhaValidar: false,
  });

  const validar_campos = () => {
    const novosErros = { ...erros };
    const novasValidacoes = { ...validacoes };

    // Validação do editarLogin
    if (userData.login.length > 4 && /^[a-zA-Z0-9]+$/.test(userData.login)) {
      novasValidacoes.loginValidar = true;
      novosErros.loginErro = false;
    } else {
      novasValidacoes.loginValidar = false;
      novosErros.loginErro = userData.login.length > 0;
    }

    // Validação do nome público
    if (userData.nomePublico.length > 4) {
      novasValidacoes.nomePublicoValidar = true;
      novosErros.nomePublicoErro = false;
    } else {
      novasValidacoes.nomePublicoValidar = false;
      novosErros.nomePublicoErro = userData.nomePublico.length > 0;
    }

    // Validação do CPF
    const cpfNumeros = userData.cpf.replace(/[.\-]/g, '');
    if (/^\d{11}$/.test(cpfNumeros)) {
      novasValidacoes.cpfValidar = true;
      novosErros.cpfErro = false;
    } else {
      novasValidacoes.cpfValidar = false;
      novosErros.cpfErro = userData.cpf.length > 0;
    }

    // Validação do email
    if (/\S+@\S+\.\S+/.test(userData.email)) {
      novasValidacoes.emailValidar = true;
      novosErros.emailErro = false;
    } else {
      novasValidacoes.emailValidar = false;
      novosErros.emailErro = userData.email.length > 0;
    }

    // Validação do DDD
    if (/^\d{2}$/.test(userData.ddd) && DDDValidos.includes(userData.ddd)) {
      novasValidacoes.DDDValidar = true;
      novosErros.dddErro = false;
    } else {
      novasValidacoes.DDDValidar = false;
      novosErros.dddErro = userData.ddd.length > 0;
    }

    // Validação do telefone
    const telefoneNumeros = userData.telefone.replace(/\D/g, '');
    if (/^\d{8,9}$/.test(telefoneNumeros)) {
      novasValidacoes.telefoneValidar = true;
      novosErros.telefoneErro = false;
    } else {
      novasValidacoes.telefoneValidar = false;
      novosErros.telefoneErro = userData.telefone.length > 0;
    }

    // Validação da senhaAtual e novaSenha
    if (userData.senhaAtual.length >= 8 && userData.senhaAtual.length <= 14) {
      novasValidacoes.senhaValidar = true;
      novosErros.senhaErro = false;
    } else {
      novasValidacoes.senhaValidar = false;
      novosErros.senhaErro = userData.senhaAtual.length > 0;
    }

    def_erros(novosErros);
    def_validacoes(novasValidacoes);
  };

  useEffect(() => {
    def_carregando(true);
    sessionStorage.setItem("Gerenciar", "ger_perfil")
    const Get = async () => {
      try {
        const token = validar_token();
        if (!token) { return false; }
        const idUser = JSON.parse(atob(token.split('.')[1])).userId;
        const { status_get, dados_get } = await meu_get(`users/${idUser}`, true);

        if (status_get !== 200) { novo_acesso(); }

        if (dados_get) {
          if (dados_get.length < 1) { novo_acesso(); }
          setUserData(prevState => ({
            ...prevState,
            login: dados_get.username || "",
            nomePublico: dados_get.publicname || "",
            cpf: dados_get.cpf || "",
            email: dados_get.email || "",
            ddd: dados_get.phone && dados_get.phone.slice(0, 2) || "",
            telefone: dados_get.phone && dados_get.phone.slice(2) || ""
          }));
        } else {
        }
      } catch (erro) {
        MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_PRF_: ${erro}`));
        return false;
      }
    }
    if (!Get()) { novo_acesso(); }
    def_carregando(false);
  }, [])

  useEffect(() => {
    validar_campos();
  }, [userData.login, userData.nomePublico, userData.cpf, userData.email, userData.ddd, userData.telefone, userData.senha, userData.novaSenha]);

  if (carregando) {
    return <h1 style={{ fontSize: "large", padding: "40px" }}>Carregando...</h1>;
  }

  const novo_acesso = () => {
    sessionStorage.clear();
    remover_token();
    window.location.href = site;
    return;
  }

  const opcao_ativa = (elemento, contentId) => {
    document.querySelectorAll('.menu_perfil li').forEach((li) => li.classList.remove('ativo'));
    document.querySelectorAll('.formularios').forEach((content) => content.classList.remove('ativo'));
    elemento.classList.add('ativo');
    let content = document.getElementById(contentId);
    if (content) { content.classList.add('ativo'); }
  };

  const salvar = async () => {
    try {
      const token = validar_token();
      if (!token) { novo_acesso(); }
      const idUser = JSON.parse(atob(token.split('.')[1])).userId;

      const { status_put, dados_put } = await meu_put(`users/${idUser}`, {
        username: userData.login,
        publicname: userData.nomePublico,
        cpf: userData.cpf,
        email: userData.email,
        phone: userData.telefone,
        password: userData.senhaAtual
      }, true);

      if (status_put !== 200) {
        defHttpResposta("Dados incorretos ou já cadastrados!"); return;
      }
    } catch (erro) {
      defHttpResposta("Estamos em manutenção!");
    }
  }

  return (
    <div id="conteudo_perfil">
      <ul className="menu_perfil">
        <li className="ativo" onClick={(e) => opcao_ativa(e.target, 'nome_usuario')}>
          {userData.nomePublico ? userData.nomePublico : "Conta"}
        </li>
        <li onClick={(e) => opcao_ativa(e.target, 'PerfilPublico')}>Perfil público</li>
      </ul>
      <div id="conteudo_editavel_perfil">
        {/* ------------------------ Privado ------------------------ */}
        <form id="nome_usuario" className="formularios ativo">
          <div className="campos_laterais">
            <label className="dados_usuario">
              <p className="dados_titulos">Usuário</p>
              <input
                className={erros.loginErro ? "aviso_erro_borda" : ""}
                value={userData.login || ""}
                onChange={(e) => setUserData({ ...userData, login: e.target.value })}
                autoComplete="name"
                placeholder="Nome"
                required
              />
              <span className="aviso_erro">
                {erros.loginErro ? "Nome deve ter mais de 4 caracteres" : ""}
              </span>
            </label>

            <label className="dados_usuario">
              <p className="dados_titulos">CPF</p>
              <input
                className={erros.cpfErro ? "aviso_erro_borda" : ""}
                value={userData.cpf || ""}
                onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                autoComplete="cpf"
                placeholder="00000000000"
                required
              />
              <span className="aviso_erro">
                {erros.cpfErro ? "Digite um CPF válido" : ""}
              </span>
            </label>
          </div>

          <div className="campos_laterais">
            <label className="dados_usuario">
              <p className="dados_titulos">Email</p>
              <input
                className={erros.emailErro ? "aviso_erro_borda" : ""}
                value={userData.email || ""}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                autoComplete="email"
                placeholder="seu@email.com"
                required
              />
              <span className="aviso_erro">
                {erros.emailErro ? "Digite um email válido" : ""}
              </span>
            </label>

            <label className="dados_usuario">
              <p className="dados_titulos">Telefone</p>
              <div id="tel_usuario">
                <input
                  className={erros.dddErro ? "aviso_erro_borda" : ""}
                  value={userData.ddd || ""}
                  onChange={(e) => setUserData({ ...userData, ddd: e.target.value })}
                  autoComplete="DDD"
                  placeholder="00"
                  required
                />
                <input
                  className={erros.telefoneErro ? "aviso_erro_borda" : ""}
                  value={userData.telefone || ""}
                  onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
                  autoComplete="tel"
                  placeholder="000000000"
                  required
                />
              </div>
              <span className="aviso_erro">
                {erros.telefoneErro ? "Número de telefone inválido" : ""}
              </span>
            </label>
          </div>

          <div className="campos_laterais" id="campos_senha_perfil">
            <div className="div_pai_nova_senha_perfil">
              <label className="dados_usuario">
                <p className="dados_titulos">Senha Atual</p>
                <input
                  className={erros.senhaErro ? "campo_senha aviso_erro" : "campo_senha"}
                  value={userData.senhaAtual || ""}
                  onChange={(e) => setUserData({ ...userData, senhaAtual: e.target.value })}
                  type={visibilidade_senha.senhaAtual ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder={visibilidade_senha.senhaAtual ? "" : "********"}
                />
                <img
                  className="ver_senha"
                  src={visibilidade_senha.senhaAtual ? SenhaVisivel : SenhaInvisivel}
                  onClick={() => def_visibilidade_senha({ ...visibilidade_senha, senhaAtual: !visibilidade_senha.senhaAtual })}
                  alt="Visibilidade"
                />
              </label>
            </div>
            <div className="div_pai_nova_senha_perfil">
              <label id="div_filho_nova_senha_perfil" className="checkbox_especial">
                <input className="input_checkbox_especial" type="checkbox" onChange={(e) => def_visibilidade_nova_senha(e.target.checked)} checked={visibilidade_nova_senha} />
                <span className="span_checkbox_especial"></span>
                <p className="dados_titulos">{visibilidade_nova_senha ? "Digite a Nova Senha" : "Alterar senha"}</p>
              </label>
              <label className="dados_usuario">
                <input
                  className={erros.senhaErro ? "campo_senha aviso_erro" : "campo_senha"}
                  value={userData.novaSenha || ""}
                  onChange={(e) => setUserData({ ...userData, novaSenha: e.target.value })}
                  type={visibilidade_nova_senha ? visibilidade_senha.novaSenha ? "text" : "password" : "password"}
                  autoComplete="new-password"
                  placeholder="********"
                  disabled={!visibilidade_nova_senha}
                />
                <img
                  className="ver_senha"
                  src={visibilidade_nova_senha ? visibilidade_senha.novaSenha ? SenhaVisivel : SenhaInvisivel : SenhaInvisivel}
                  onClick={() => def_visibilidade_senha({ ...visibilidade_senha, novaSenha: !visibilidade_senha.novaSenha })}
                  alt="Visibilidade"
                  style={{ pointerEvents: visibilidade_nova_senha ? "auto" : "none" }}
                />
              </label>
            </div>
          </div>
          <br />
          <div className="campos_laterais botoes_lateria">
            <button className="expandir" type="button" onClick={e => { sessionStorage.setItem("Gerenciar", "ger_perfil"); window.location.href = window.location.href; }}>Desfazer</button>
            <button className="expandir" type="button" onClick={salvar}>Salvar</button>
          </div>
        </form>
        {/* ------------------------ Publico ------------------------ */}
        <form id="PerfilPublico" className="formularios">
          <label className="dados_usuario">
            <h4 style={{ textAlign: "center" }}>Esse informações ficaram visível a todos!</h4>
            <p className="dados_titulos">Nome público</p>
            <input
              className={erros.nomePublicoErro ? "aviso_erro_borda" : ""}
              value={userData.nomePublico || ""}
              onChange={(e) => setUserData({ ...userData, nomePublico: e.target.value })}
              autoComplete="name"
              placeholder="Nome público"
              required
            />
            <span className="aviso_erro">
              {erros.nomePublicoErro ? "Nome deve ter mais de 4 caracteres" : ""}
            </span>
            <br />
          </label>
        </form>
      </div>
    </div>
  );
}