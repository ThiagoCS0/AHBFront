import { useContext } from "react";
import Sol from "../../../../assets/sol.png"
import Lua from "../../../../assets/lua.png"
import { ContextoTema } from "../../../Principais/Temas/TemasContexto"

export default function Tema() {
  const { temas, alterar_tema } = useContext(ContextoTema);

  return (
    <img
      className="icones"
      src={temas ? Sol : Lua}
      alt="Tema"
      onClick={() => { alterar_tema(!temas) }} />
  )
}