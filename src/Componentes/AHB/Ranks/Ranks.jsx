import Abas from "../../Principais/Abas/Abas";

export default function Ranks({ aba }) {
 return (
  <div id="ranks">
   <Abas
    pai="ranks"
    titulos={[
     { nome: "+ Populares", conteudo: "ranks_populares" },
     { nome: "+ Recentes", conteudo: "ranks_recentes" },
     // { nome: "+ Votadas", conteudo: "ranks_votadas" },
    ]}
    conteudos={[
     <div id="ranks_populares" className="texto_simples">
      <div>
       <h1>APIs + Populares</h1>
      </div>
      <p>
       Conheça as APIs mais acessadas e utilizadas pela comunidade. Essas são as favoritas, provando sua relevância e utilidade em diversos projetos.
      </p>
     </div>,
     <div id="ranks_recentes" className="texto_simples">
      <div>
       <h1>APIs + Recentes</h1>
      </div>
      <p>
       Confira as APIs mais novas cadastradas na plataforma. Explore as novidades fresquinhas e encontre soluções inovadoras para seus projetos.
      </p>
     </div>,
     // <div id="ranks_votadas" className="texto_simples">
     //  <div>
     //   <h1>APIs + Votadas</h1>
     //  </div>
     //  <p>
     //   Descubra as APIs com as melhores avaliações da comunidade. Essas são as ferramentas mais recomendadas pelos usuários, ideais para quem busca qualidade e aprovação coletiva.
     //  </p>
     // </div>
    ]}
    aba={aba}
   />
  </div>
 )
}