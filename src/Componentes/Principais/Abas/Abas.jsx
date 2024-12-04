import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Abas.css";

export default function Abas({ pai, titulos, conteudos, aba }) {
 
 useEffect(() => {
  if (aba) {
   const linkAtivo = document.querySelector(`#${pai} .abas_titulos a#${aba}`);
   if (linkAtivo) { opcao_ativa(linkAtivo, aba); }
  }
 }, [aba, pai]);

 const opcao_ativa = (elemento, id_conteudo) => {
  document.querySelectorAll(`#${pai} .abas_titulos a`)
   .forEach(a => a.classList.remove("aba_ativa"));

  document.querySelectorAll(`#${pai} .aba_conteudo`)
   .forEach(conteudo => conteudo.classList.remove("aba_conteudo_ativo"));
  elemento.classList.add("aba_ativa");

  const conteudo = document.querySelector(`div[id="${id_conteudo}"]`);
  if (conteudo) { conteudo.classList.add("aba_conteudo_ativo"); }
 };

 const abas_titulos = () => (
  <div className="abas_titulos">{titulos.map((aba, index) => (
   <Link id={aba.conteudo} key={index} onClick={e => {
    e.preventDefault(); opcao_ativa(e.target, aba.conteudo);
   }} > {aba.nome} </Link>
  ))}
  </div>
 );

 const abas_conteudos = () => (<div className="abas_conteudos">
  {conteudos.map((conteudo, index) => (
   <div key={index} id={conteudo.props.id} className="aba_conteudo"> {conteudo} </div>))} </div>
 );

 return (<div id={pai}> {abas_titulos()} {abas_conteudos()} </div>);
}