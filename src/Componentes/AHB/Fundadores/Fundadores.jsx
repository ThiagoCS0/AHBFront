import "./Fundadores.css";
import Github from "../../../assets/github.png";
import Linkedin from "../../../assets/linkedin.png";

export default function Fundadores() {
  return (
    <div id="fundadores">
      <p>Fundadores</p>
      <div id="fundadores_dados">

        <div>
          <a href="https://www.linkedin.com/in/rafaelaoliveiramarques/"
            target="_blank" rel="noopener noreferrer"
            aria-hidden="true">
            <b className="nome_completo">
              <p>Rodrigo</p>
              <p className="fundadores_sobrenome">Vieira</p>
            </b>
          </a>
          <div className="fundadores_social">
            <a href="https://github.com/rodrigosv91">
              <img src={Github} alt="" /></a>
            <a href="https://www.linkedin.com/in/rodrigo7791/"
              target="_blank" rel="noopener noreferrer"
              aria-hidden="true">
              <img src={Linkedin} alt="" /></a>
          </div>
        </div>

        <div>
          <a href="https://www.linkedin.com/in/rafaelaoliveiramarques/"
            target="_blank" rel="noopener noreferrer"
            aria-hidden="true">
            <b className="nome_completo"><p>Rafaela</p>
              <p className="fundadores_sobrenome">O. Marques</p></b>
          </a>
          <div className="fundadores_social">
            <a href="https://github.com/RafaelaOMarques">
              <img src={Github} alt="" /></a>
            <a href="https://www.linkedin.com/in/rafaelaoliveiramarques/"
              target="_blank" rel="noopener noreferrer"
              aria-hidden="true">
              <img src={Linkedin} alt="" /></a>
          </div>
        </div>
        
        <div>
          <a href="https://www.linkedin.com/in/thiago-cs/"
            target="_blank" rel="noopener noreferrer"
            aria-hidden="true">
            <b className="nome_completo">
              <p>Thiago</p>
              <p className="fundadores_sobrenome">C. Silva</p>
            </b>
          </a>
          <div className="fundadores_social">
            <a href="https://github.com/ThiagoCS0"
              target="_blank" rel="noopener noreferrer"
              aria-hidden="true">
              <img src={Github} alt="" /></a>
            <a href="https://www.linkedin.com/in/thiago-cs/"
              target="_blank" rel="noopener noreferrer"
              aria-hidden="true">
              <img src={Linkedin} alt="" /></a>
          </div>
        </div>

      </div>
    </div>
  )
}