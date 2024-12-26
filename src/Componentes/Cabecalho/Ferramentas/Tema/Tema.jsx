import { useContext } from "react";
import { ContextoTema } from "../../../Principais/Temas/TemasContexto"
import icon_sol from "./../../../../../src/Recursos/icones/sol.png"
import icon_lua from "./../../../../../src/Recursos/icones/lua.png"

export default function Tema() {
  const { temas, alterar_tema } = useContext(ContextoTema);

  return (
    <img
      className="icones"
      src={temas ? icon_sol : icon_lua}
      alt="Tema"
      onClick={() => alterar_tema(!temas) } />
  )
}