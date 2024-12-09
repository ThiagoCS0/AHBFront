import Fundadores from "../AHB/Fundadores/Fundadores"
import LinksUteis from "../AHB/LinksUteis/LinksUteis"
import InforRodape from "../AHB/InformacoesRodape/InformacoesRodape"
import "./Rodape.css"

export default function Rodape() {

  return (
    <div id="rodape" className="ondulacao-3">
      <Fundadores />
      <LinksUteis />
      <InforRodape />
    </div>
  )
}