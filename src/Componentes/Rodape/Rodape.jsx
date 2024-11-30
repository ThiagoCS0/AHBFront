import Fundadores from "../AHB/Fundadores/Fundadores"
import LinksUteis from "../AHB/LinksUteis/LinksUteis"
import InforRodape from "../AHB/InformacoesRodape/InformacoesRodape"
import "./Rodape.css"

export default function Rodape({ fixar_abaixo }) {

  return (
    <div id="rodape" className={"ondulacao-3 " + (fixar_abaixo ? "rodape_fixar_abaixo" : "")}>
      <Fundadores />
      <LinksUteis />
      <InforRodape />
    </div>
  )
}