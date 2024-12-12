import { useEffect, useState } from "react";
import { validar_token } from "../../../Servicos/JWT/JWT";
import { meu_get, meu_put } from "../../../Servicos//Backend/Conexao";
import { usuario_id } from "../../../Servicos/Usuario/Usuario";
import { meus_erros } from "../../../Erros/MeusErros";
import Carregamento from "../../../Carregamento/Carregamento";
import Abas from "../../../Abas/Abas"

const site = import.meta.env.VITE_SITE;

export default function Perfil() {
  const [dados_usuario, def_dados_usuario] = useState({ login: "", nomePublico: "", cpf: "", email: "", ddd: "", telefone: "", senhaAtual: "", novaSenha: "", });
  const [visibilidade_senha, def_visibilidade_senha] = useState({ senhaAtual: false, novaSenha: false, });
  const [visibilidade_nova_senha, def_visibilidade_nova_senha] = useState(false);
  const [carregando, def_carregando] = useState(true);

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
    if (dados_usuario.login.length > 4 && /^[a-zA-Z0-9]+$/.test(dados_usuario.login)) {
      novasValidacoes.loginValidar = true;
      novosErros.loginErro = false;
    } else {
      novasValidacoes.loginValidar = false;
      novosErros.loginErro = dados_usuario.login.length > 0;
    }

    // Validação do nome público
    if (dados_usuario.nomePublico.length > 4) {
      novasValidacoes.nomePublicoValidar = true;
      novosErros.nomePublicoErro = false;
    } else {
      novasValidacoes.nomePublicoValidar = false;
      novosErros.nomePublicoErro = dados_usuario.nomePublico.length > 0;
    }

    // Validação do CPF
    const cpfNumeros = dados_usuario.cpf.replace(/[.\-]/g, '');
    if (/^\d{11}$/.test(cpfNumeros)) {
      novasValidacoes.cpfValidar = true;
      novosErros.cpfErro = false;
    } else {
      novasValidacoes.cpfValidar = false;
      novosErros.cpfErro = dados_usuario.cpf.length > 0;
    }

    // Validação do email
    if (/\S+@\S+\.\S+/.test(dados_usuario.email)) {
      novasValidacoes.emailValidar = true;
      novosErros.emailErro = false;
    } else {
      novasValidacoes.emailValidar = false;
      novosErros.emailErro = dados_usuario.email.length > 0;
    }

    // Validação do DDD
    if (/^\d{2}$/.test(dados_usuario.ddd) && DDDValidos.includes(dados_usuario.ddd)) {
      novasValidacoes.DDDValidar = true;
      novosErros.dddErro = false;
    } else {
      novasValidacoes.DDDValidar = false;
      novosErros.dddErro = dados_usuario.ddd.length > 0;
    }

    // Validação do telefone
    const telefoneNumeros = dados_usuario.telefone.replace(/\D/g, '');
    if (/^\d{8,9}$/.test(telefoneNumeros)) {
      novasValidacoes.telefoneValidar = true;
      novosErros.telefoneErro = false;
    } else {
      novasValidacoes.telefoneValidar = false;
      novosErros.telefoneErro = dados_usuario.telefone.length > 0;
    }

    // Validação da senhaAtual e novaSenha
    if (dados_usuario.senhaAtual.length >= 8 && dados_usuario.senhaAtual.length <= 14) {
      novasValidacoes.senhaValidar = true;
      novosErros.senhaErro = false;
    } else {
      novasValidacoes.senhaValidar = false;
      novosErros.senhaErro = dados_usuario.senhaAtual.length > 0;
    }

    def_erros(novosErros);
    def_validacoes(novasValidacoes);
  };

  useEffect(() => {
    def_carregando(true);
    sessionStorage.setItem("Paginas", "Perfil")
    const Get = async () => {
      try {
        const id_usuario = usuario_id()
        const { status_get, dados_get } = await meu_get(`users/${id_usuario}`, true);
        if (!status_get && !dados_get) { window.location.href = site; }
        if (!dados_get) { return false; }

        if (Math.floor(status_get / 100) !== 2) { novo_acesso(); }

        if (dados_get) {
          if (dados_get.length < 1) { novo_acesso(); }
          def_dados_usuario(prevState => ({
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
        meus_erros(import.meta.url.split('/').pop(), "CAT_PER_USF_INI", erro);
        return false;
      }
    }
    if (!Get()) { novo_acesso(); }
    def_carregando(false);
  }, [])

  useEffect(() => {
    validar_campos();
  }, [dados_usuario.login, dados_usuario.nomePublico, dados_usuario.cpf, dados_usuario.email, dados_usuario.ddd, dados_usuario.telefone, dados_usuario.senha, dados_usuario.novaSenha]);

  const novo_acesso = () => {
    sessionStorage.clear();
    remover_token();
    window.location.href = site;
    return;
  }

  const salvar = async () => {
    try {
      const token = validar_token();
      if (!token) { novo_acesso(); }

      const id_usuario = usuario_id();

      const { status_put, dados_put } = await meu_put(`users/${id_usuario}`, {
        username: dados_usuario.login,
        publicname: dados_usuario.nomePublico,
        cpf: dados_usuario.cpf,
        email: dados_usuario.email,
        phone: dados_usuario.telefone,
        password: dados_usuario.senhaAtual
      }, true);

      if (!status_put && !dados_put) { window.location.href = site; }

      if (Math.floor(status_put / 100) !== 2) {
        defHttpResposta("Dados incorretos ou já cadastrados!"); return;
      }
    } catch (erro) {
      defHttpResposta("Estamos em manutenção!");
    }
  }

  return (
    carregando
      ?
      <Carregamento carregando={carregando} />
      :
      <div id="conteudo_perfil">
        <Abas
          pai="conteudo_perfil"
          titulos={[
            { nome: dados_usuario.nomePublico ? dados_usuario.nomePublico : "Conta", conteudo: "perfil_privado" },
            { nome: "Perfil público", conteudo: "perfil_publico" },
          ]}
          conteudos={[
            /* ------------------------ Privado ------------------------ */
            <div id="perfil_privado">
              <form>
                <div className="campos_laterais">
                  <label className="dados_usuario">
                    <p className="dados_usuario_titulos">Usuário</p>
                    <input
                      className={erros.loginErro ? "aviso_erro_borda" : ""}
                      value={dados_usuario.login || ""}
                      onChange={(e) => def_dados_usuario({ ...dados_usuario, login: e.target.value })}
                      autoComplete="name"
                      placeholder="Nome"
                      required
                    />
                    <span className="aviso_erro">
                      {erros.loginErro ? "Deve ter mais de 4 caracteres" : ""}
                    </span>
                  </label>

                  <label className="dados_usuario">
                    <p className="dados_usuario_titulos">CPF</p>
                    <input
                      className={erros.cpfErro ? "aviso_erro_borda" : ""}
                      value={dados_usuario.cpf || ""}
                      onChange={(e) => def_dados_usuario({ ...dados_usuario, cpf: e.target.value })}
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
                    <p className="dados_usuario_titulos">Email</p>
                    <input
                      className={erros.emailErro ? "aviso_erro_borda" : ""}
                      value={dados_usuario.email || ""}
                      onChange={(e) => def_dados_usuario({ ...dados_usuario, email: e.target.value })}
                      autoComplete="email"
                      placeholder="seu@email.com"
                      required
                    />
                    <span className="aviso_erro">
                      {erros.emailErro ? "Email inválido" : ""}
                    </span>
                  </label>

                  <label className="dados_usuario ">
                    <p className="dados_usuario_titulos">Telefone</p>
                    <div className="dados_usuario_tel">
                      <input
                        className={erros.dddErro ? "aviso_erro_borda" : ""}
                        value={dados_usuario.ddd || ""}
                        onChange={(e) => def_dados_usuario({ ...dados_usuario, ddd: e.target.value })}
                        autoComplete="DDD"
                        placeholder="00"
                        required
                      />
                      <input
                        className={erros.telefoneErro ? "aviso_erro_borda" : ""}
                        value={dados_usuario.telefone || ""}
                        onChange={(e) => def_dados_usuario({ ...dados_usuario, telefone: e.target.value })}
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

                  <label className="dados_usuario">
                    <p className="dados_usuario_titulos">Senha Atual</p>
                    <input
                      className={erros.senhaErro ? "campo_senha aviso_erro" : "campo_senha"}
                      value={dados_usuario.senhaAtual || ""}
                      onChange={(e) => def_dados_usuario({ ...dados_usuario, senhaAtual: e.target.value })}
                      type={visibilidade_senha.senhaAtual ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder={visibilidade_senha.senhaAtual ? "" : "********"}
                    />
                    <img
                      className="dados_usuario_ver_senha"
                      src={visibilidade_senha.senhaAtual ? "./icones/senha_visivel.png" : "./icones/senha_invisivel.png"}
                      onClick={() => def_visibilidade_senha({ ...visibilidade_senha, senhaAtual: !visibilidade_senha.senhaAtual })}
                      alt="Visibilidade"
                    />
                  </label>

                  <div id="perfil_nova_senha"  className="dados_usuario">

                    <label className="dados_usuario_checkbox">
                      <input
                        className="input_dados_usuario_checkbox"
                        type="checkbox"
                        onChange={(e) => def_visibilidade_nova_senha(e.target.checked)}
                        checked={visibilidade_nova_senha}
                      />
                      <span className="span_dados_usuario_checkbox"></span>{visibilidade_nova_senha ? "Digite a Nova Senha" : "Alterar senha"}
                    </label>

                    <label className="dados_usuario">
                      <input
                        className={erros.senhaErro ? "campo_senha aviso_erro" : "campo_senha"}
                        value={dados_usuario.novaSenha || ""}
                        onChange={(e) => def_dados_usuario({ ...dados_usuario, novaSenha: e.target.value })}
                        type={visibilidade_nova_senha ? visibilidade_senha.novaSenha ? "text" : "password" : "password"}
                        autoComplete="new-password"
                        placeholder="********"
                        disabled={!visibilidade_nova_senha}
                      />
                      <img
                        className="dados_usuario_ver_senha"
                        src={visibilidade_nova_senha ? visibilidade_senha.novaSenha ?  "./icones/senha_visivel.png" : "./icones/senha_invisivel.png" : "./icones/senha_invisivel.png"}
                        onClick={() => def_visibilidade_senha({ ...visibilidade_senha, novaSenha: !visibilidade_senha.novaSenha })}
                        alt="Visibilidade"
                        style={{ pointerEvents: visibilidade_nova_senha ? "auto" : "none" }}
                      />
                    </label>
                  </div>

                </div>
                <br />
                <div className="botoes_laterais">
                  <button className="expandir" type="button" onClick={e => { sessionStorage.setItem("Paginas", "Perfil"); window.location.href = window.location.href; }}>Desfazer</button>
                  <button className="expandir" type="button" onClick={salvar}>Salvar</button>
                </div>
              </form>
            </div>,
            /* ------------------------ Publico ------------------------ */
            <div id="perfil_publico">
              <form>
                <label className="dados_usuario">
                  <h4 style={{ textAlign: "center" }}>Esse informações ficaram visível a todos!</h4>
                  <p className="dados_usuario_titulos">Nome público</p>
                  <input
                    className={erros.nomePublicoErro ? "aviso_erro_borda" : ""}
                    value={dados_usuario.nomePublico || ""}
                    onChange={(e) => def_dados_usuario({ ...dados_usuario, nomePublico: e.target.value })}
                    autoComplete="name"
                    placeholder="Nome público"
                    required
                  />
                  <span className="aviso_erro">
                    {erros.nomePublicoErro ? "Deve ter mais de 4 caracteres" : ""}
                  </span>
                  <br />
                </label>
              </form>
            </div>,
          ]}
          aba={"perfil_privado"}
        />
      </div>
  );
}