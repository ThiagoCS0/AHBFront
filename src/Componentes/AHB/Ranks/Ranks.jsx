import Abas from "../../Principais/Abas/Abas";

export default function Ranks({ aba }) {
 return (
  <div id="ranks">
   <Abas
    pai="ranks"
    titulos={[
     { nome: "+ Votadas", conteudo: "ranks_votadas" },
     { nome: "+ Recentes", conteudo: "ranks_recentes" },
     { nome: "+ Populares", conteudo: "ranks_populares" },
    ]}
    conteudos={[
     <div id="ranks_votadas">+ Votadas</div>,
     <div id="ranks_recentes">+ Recentes</div>,
     <div id="ranks_populares">+ Populares</div>,
    ]}
    aba={aba}
   />
  </div>
 )
}