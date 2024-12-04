import { useEffect, useState } from "react";
import { remover_token } from "../../Principais/Servicos/JWT/JWT";
import { Link } from "react-router-dom";

const inicio = import.meta.env.VITE_INICIAL;
const site = import.meta.env.VITE_SITE;

export default function Recuperar() {

 const [email, defEmail] = useState("");
 const [emailValido, defEmailValido] = useState(false);
 const [emailAvisoErro, defEmailAvisoErro] = useState(false);

 const validando = () => {
  if (email.length > 0) {
   defEmailValido(false);
   const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (regexEmail.test(email)) {
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
   alert("Apenas Teste: Email de recuperação enviado!");
   window.location.href = inicio;
  }
 };

 return (
  <div>
   <Link to={site + "Acesso"} onClick={() => sessionStorage.setItem("Acesso", "Acessar")} className="botao_voltar"></Link>
   <form onSubmit={Enviar} className="dados_usuario_principal">
    <label className="dados_usuario">
     <p className="dados_usuario_titulos">Email</p>
     <input
      className={emailAvisoErro ? "aviso_erro_borda" : ""}
      onChange={(e) => { defEmail(e.target.value); }}
      placeholder="seu@email.com"
      autoComplete="email"
      onKeyUp={validando}
      value={email || ""}
      type="email"
      name="email"
      id="email"
      required
     />
     <span className="aviso_erro">{emailAvisoErro ? "Digite um email válido" : ""}</span>
    </label>
    <button className="expandir" type="submit" > Recuperar senha </button>
   </form>
  </div>
 );
}