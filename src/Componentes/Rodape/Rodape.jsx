import Fundadores from "../AHB/Fundadores/Fundadores"
import "./Rodape.css"

export default function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <div id="rodape" className="ondulacao-3">

      <div id="infor_links_uteis">
        <div id="infor_rank" className="infor_links">
          <p><b>Rank APIs</b></p>
          <a href="">+ Votadas</a>
          <a href="">+ Recentes</a>
          <a href="">+ Populares</a>
        </div>
      <Fundadores />
      <div id="infor_partocinio" className="infor_links">
          <p><b>Nossos Parceiros</b></p>
          <a href="">Instituições</a>
          <a href="">Apoidores</a>
        </div>
      </div>

      <div id="infor_abh">
        <p><b>© {ano} API Hub Brasil</b> Todos os direitos reservados</p>
        <div>
          <a href="">Ajude o projeto <b>Doando</b></a>
          <a href="">Sobre <b>AHB</b></a>
          <a href="">Termos de Uso</a>
        </div>
      </div>

    </div>
  )
}