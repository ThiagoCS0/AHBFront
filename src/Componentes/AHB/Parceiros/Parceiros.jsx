import { Link } from "react-router-dom";
import Abas from "../../Principais/Abas/Abas";

export default function Parceiros({ aba }) {

 return (
  <div id="parceiros">
   <Abas
    pai="parceiros"
    titulos={[
     { nome: "Instituições", conteudo: "parceiros_instituicoes" },
     { nome: "Apoiadores", conteudo: "parceiros_apoiadores" },
    ]}
    conteudos={[
     <div id="parceiros_instituicoes">Instituições</div>,
     <div id="parceiros_apoiadores">Apoiadores</div>,
    ]}
    aba={aba}
   />
  </div>
 )
}