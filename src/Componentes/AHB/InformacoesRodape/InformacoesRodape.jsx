import { Link, useNavigate } from "react-router-dom";

export default function InformacoesRodape() {
 const navegar = useNavigate();
 const tela_grande = window.screen.width > 1000;
 const ano = new Date().getFullYear();

 const pagina = (e) => {
  sessionStorage.setItem("Paginas", e)
  window.location.href="Gerenciar"
 }

 return (
  <div id="infor_abh">
   <p><b>© {ano} {tela_grande ? "API HUB BRASIL" : "AHB"}</b> Todos os direitos reservados</p>
   <div>
    <Link onClick={e => { pagina("Doacao"); }}>{tela_grande ? <>Ajude o projeto <b>Doando</b></> : <>Fazer <b>Doação</b></>}</Link>
    <div>
     <Link onClick={e => { pagina("Sobre"); }}>Sobre <b>AHB</b></Link>
     <Link onClick={e => { pagina("Termos"); }}>Termos de Uso</Link>
    </div>
   </div>
  </div>
 )
}