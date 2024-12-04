import { Link } from "react-router-dom";

export default function LinksUteis() {

 const pagina = (pag, aba) => {
  sessionStorage.setItem("Paginas", JSON.stringify({ pag: pag, aba: aba }));
  window.location.href = "Gerenciar"
 }

 return (
  <div id="infor_links_uteis">
   <div id="infor_rank" className="infor_links">
    <p><b>Rank APIs</b></p>
    <Link onClick={() => { pagina("Ranks", "ranks_votadas") }}>+ Votadas</Link>
    <Link onClick={() => { pagina("Ranks", "ranks_recentes") }}>+ Recentes</Link>
    <Link onClick={() => { pagina("Ranks", "ranks_populares") }}>+ Populares</Link>
   </div>
   <div id="infor_partocinio" className="infor_links">
    <p><b>Nossos Parceiros</b></p>
    <Link onClick={() => { pagina("Parceiros", "parceiros_instituicoes") }}>Instituições</Link>
    <Link onClick={() => { pagina("Parceiros", "parceiros_apoiadores") }}>Apoidores</Link>
   </div>
  </div>
 )
}