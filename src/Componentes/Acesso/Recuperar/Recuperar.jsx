import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { remover_token } from "../../Principais/Servicos/JWT/JWT";

const inicio = import.meta.env.VITE_INICIAL;

export default function Recuperar() {

 const [email, defEmail] = useState("");
 const [emailValido, defEmailValido] = useState(false);
 const [emailAvisoErro, defEmailAvisoErro] = useState(false);
 const navegar = useNavigate();

 const Checagem = () => {
  if (email.length > 0) {
   defEmailValido(false);
   if (/\S+@\S+\.\S+/.test(email)) {
    defEmailValido(true);
    defEmailAvisoErro(false);
   } else {
    defEmailAvisoErro(true);
   }
  } else {
   defEmailValido(false);
   defEmailAvisoErro(false);
  }
 };

 useEffect(() => {
  remover_token();
  document.getElementById("email").focus();
 }, []);

 const Enviar = (e) => {
  e.preventDefault();
  if (emailValido) {
   alert("Email de recuperação enviado!");
   window.location.href = inicio;
  }
 };

 return (
  <div className="dados_usuario_fundo">
   <Link to="/AHBFront/Acesso" onClick={() => sessionStorage.setItem("Acesso", "Acessar")} className="botao_voltar"></Link>
   <form onSubmit={Enviar} className="dados_usuario_principal">
    <div>
     <label className="dados_usuario">
      <p className="dados_usuario_titulos">Email</p>
      <input
       className={emailAvisoErro ? "input_error" : ""}
       onChange={(e) => { defEmail(e.target.value); }}
       placeholder="seu@email.com"
       autoComplete="email"
       onKeyUp={Checagem}
       value={email || ""}
       type="email"
       name="email"
       id="email"
       required
      />
      <span className="aviso_campo_invalido">{emailAvisoErro ? "Digite um email válido" : ""}</span>
     </label>
     <button className="expandir" type="submit" > Recuperar senha </button>
    </div>
   </form>
  </div>
 );
}