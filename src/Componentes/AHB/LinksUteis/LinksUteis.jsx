import { Link } from "react-router-dom";

export default function LinksUteis() {

 const pagina = (pag, aba) => {
  sessionStorage.setItem("Paginas", aba ? JSON.stringify({ pag: pag, aba: aba }) : pag);
  window.location.reload();
 }

 return (
  <div id="infor_links_uteis">
   {/* <div id="infor_rank" className="desativado infor_links" style={{pointerEvents:"none"}}> */}
   <div id="infor_rank" className="infor_links">
    <p><b>Rank APIs</b></p>
    <Link onClick={() => pagina("Ranks", "ranks_recentes")}>+ Recentes</Link>
    {/* <Link onClick={() => pagina("Ranks", "ranks_populares")}>+ Populares</Link> */}
    {/* <Link onClick={() => pagina("Ranks", "ranks_votadas")}>+ Votadas</Link> */}
   </div>
   <div id="infor_ahb" className="infor_links">
    <p><b>API Hub Brasil</b></p>
    <Link onClick={() => pagina("Sobre")}>Sobre AHB</Link>
    <Link onClick={() => pagina("Doacao")} className="desativado" style={{ pointerEvents: 'none' }}>Fazer Doação</Link>
    <Link onClick={() => pagina("Termos")}>Termos de Uso</Link>
   </div>
   {/* <div id="infor_partocinio" className="infor_links">
    <p><b>Nossos Parceiros</b></p>
    <Link onClick={() => pagina("Parceiros", "parceiros_instituicoes") }>Instituições</Link>
    <Link onClick={() => pagina("Parceiros", "parceiros_apoiadores") }>Apoidores</Link>
   </div> */}
  </div>
 )
}