import Inicio from "../../../../assets/inicio.png";

const site = import.meta.env.VITE_SITE;

export default function Iniciar() {
 return (
  <img
   onClick={() => { sessionStorage.clear(); window.location.href = site; }}
   src={Inicio}
   className="icones"
  />
 )
}