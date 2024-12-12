import { useContext } from "react";
import { ContextoTema } from "../../../Principais/Temas/TemasContexto"

export default function Tema() {
  const { temas, alterar_tema } = useContext(ContextoTema);

  return (
    <img
      className="icones"
      src={temas ? "./icones/sol.png" : "./icones/lua.png"}
      alt="Tema"
      onClick={() => alterar_tema(!temas) } />
  )
}