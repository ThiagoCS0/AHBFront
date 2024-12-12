const site = import.meta.env.VITE_SITE;

export default function Iniciar() {
 return (
  <img
   onClick={() => { sessionStorage.clear(); window.location.href = site; }}
   src="./icones/inicio.png"
   className="icones"
  />
 )
}