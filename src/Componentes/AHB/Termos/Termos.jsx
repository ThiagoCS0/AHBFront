import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validar_token } from "../../Principais/Servicos/JWT/JWT";
import "./Termos.css"

export default function Termos() {
  const navegar = useNavigate();
  const [carregando, def_carregando] = useState(true);


  useEffect(() => {
    sessionStorage.setItem("Gerenciar", "ger_termos")
  }, []);

  useEffect(() => {
    if (!validar_token()) {
      navegar("/Acesso");
      return;
    }
    def_carregando(false);
  }, [navegar]);

  if (carregando) {
    return <h1 style={{ fontSize: "large", padding: "40px" }}>Carregando...</h1>;
  }

  return (
    <div className="conteudo_termos">
      <div>
        <h2>Termos de Uso para cadastro de APIs</h2>
        <p>Ao cadastrar uma API nesta plataforma, o <b>usuário declara</b> que:</p>
      </div>
      <h2>1. Alterações nos Termos de Uso</h2>
      <p>Podemos revisar e atualizar estes Termos de Uso de tempos em tempos, a <b>nosso exclusivo critério</b>. Todas as alterações entram em vigor <b>imediatamente quando as publicamos</b>, e se aplicam a <b>todo acesso e uso do Site a partir de então</b>. </p>
      <h2>2. Concordância com os Termos</h2>
      <p>Ao cadastrar uma API, o <b>usuário aceita e concorda com todas as condições aqui descritas.</b></p>
      <br />
      <h2>3. Responsabilidade do Usuário</h2>
      <p>O conteúdo, funcionalidade e qualquer operação realizada pela API cadastrada são de total responsabilidade do <b>usuário que a desenvolveu e publicou</b>. A plataforma não se responsabiliza por danos, prejuízos ou qualquer tipo de problema causado pela API disponibilizada.</p>
      <br />
      <h2>4. Proibições</h2>
      <p>Não é permitido publicar APIs que promovam:</p>
      <ul>
        <li>Discriminação ou discursos de ódio contra qualquer grupo ou indivíduo;</li>
        <li>Acesso ou modificação não autorizada de sistemas e dados (hackeamento);</li>
        <li>Atividades ilícitas, como fraudes, disseminação de malware ou phishing;</li>
        <li>Conteúdos danosos, ilegais ou que possam infringir a privacidade e segurança de terceiros.</li>
      </ul>
      <br />
      <h2>5. Remoção de APIs Irregulares</h2>
      <p>A plataforma se reserva o direito de <b>remover imediatamente, sem aviso prévio</b>, qualquer API que seja considerada em violação a estes Termos de Uso, especialmente em casos de denúncia ou comprovação de conteúdo irregular ou danoso.</p>
    </div>
  );
};