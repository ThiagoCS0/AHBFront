import { Link } from "react-router-dom";
import Abas from "../../Principais/Abas/Abas";

export default function Parceiros({ aba }) {

 return (
   <Abas
    pai="parceiros"
    titulos={[
     { nome: "Instituições", conteudo: "parceiros_instituicoes" },
     { nome: "Apoiadores", conteudo: "parceiros_apoiadores" },
    ]}
    conteudos={[
     <>
      <div>
       <h1>Instituições</h1>
      </div>
      <p>
       A <b>API HUB BRASIL</b> valoriza a parceria com instituições de ensino e organizações que acreditam na importância da tecnologia para a educação. Juntos, criamos um ambiente onde alunos, professores e desenvolvedores têm acesso a recursos que fortalecem o aprendizado e a inovação.
      </p>
     </>
     ,
     <>
      <div>
       <h1>Apoiadores</h1>
      </div>
      <p>
       Agradecemos aos nossos apoiadores que acreditam na missão da <b>API HUB BRASIL</b>. É graças ao seu apoio que conseguimos manter a plataforma ativa e continuar desenvolvendo recursos que beneficiam a comunidade de tecnologia e educação no Brasil. Sua confiança nos impulsiona a ir mais longe!
      </p>
     </>
    ]}
    ids_conteudos={["parceiros_instituicoes", "parceiros_apoiadores"]}
    aba={aba}
   />
 )
}