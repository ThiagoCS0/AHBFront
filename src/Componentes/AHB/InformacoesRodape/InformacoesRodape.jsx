import { Link, useNavigate } from "react-router-dom";

export default function InformacoesRodape() {
 const navegar = useNavigate();
 const tela_grande = window.innerWidth > 1000;
 const ano = new Date().getFullYear();

 const pagina = (e) => {
  sessionStorage.setItem("Paginas", e)
  window.location.href = "Gerenciar";
 }

 return (
  <div id="infor_abh">
   <p><b>© {ano} {tela_grande ? "API HUB BRASIL" : "AHB"}</b> Todos os direitos reservados</p>
   <div>
    <Link onClick={() => pagina("Doacao")} className="desativado" style={{ pointerEvents: 'none' }}>{tela_grande ? <>Ajude o projeto <b>Doando</b></> : <>Fazer <b>Doação</b></>}</Link>
    <div>
     <Link onClick={() => pagina("Sobre")}>Sobre  AHB</Link>
     <Link onClick={() => pagina("Termos")}>Termos de Uso</Link>
    </div>
   </div>
  </div>
 )
}