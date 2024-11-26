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
      navegar("Acesso");
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
      </div>
      <h2>1. Concordância com os Termos</h2>
      <p>Ao se cadastrar, o <b>usuário aceita e concorda com todas as condições aqui descritas</b>.</p>

      <h2>2. Alterações nos Termos de Uso</h2>
      <p>Podemos revisar e atualizar estes Termos de Uso de tempos em tempos, a <b>nosso exclusivo critério</b>. Todas as alterações entram em vigor <b>imediatamente quando publicadas</b> e se aplicam a <b>todo acesso e uso do Site</b> a partir de então.</p>

      <h2>3. Responsabilidade do Usuário</h2>
      <p>O conteúdo, funcionalidade e qualquer operação realizada pela API cadastrada <b>são de total responsabilidade do usuário que a desenvolveu e publicou</b>.</p>
      <br />
      <p><b>A plataforma não se responsabiliza</b> por danos, prejuízos ou qualquer tipo de problema causado pela API disponibilizada.</p>

      <h2>4. Proibições</h2>
      <p><b>Não é permitido publicar APIs que promovam</b>:</p>
      <ul>
        <li>Discriminação ou discursos de ódio contra qualquer grupo ou indivíduo;</li>
        <li>Acesso ou modificação não autorizada de sistemas e dados (hackeamento);</li>
        <li>Atividades ilícitas, como fraudes, disseminação de malware ou phishing;</li>
        <li>Conteúdos danosos, ilegais ou que possam infringir a privacidade e segurança de terceiros.</li>
      </ul>

      <h2>5. Remoção de APIs Irregulares</h2>
      <p>A plataforma se reserva o direito de <b>remover imediatamente, sem aviso prévio, qualquer API que seja considerada em violação a estes Termos de Uso</b>, especialmente em casos de denúncia ou comprovação de conteúdo irregular ou danoso.</p>

      <br />
      <h2 style={{ textAlign: "center" }}>Regras para Tipos de Conta</h2>

      <h2>1. Contas Grátis</h2>
      <ul>
        <li>Acesso quase completo ao site, com funcionalidades limitadas;</li>
        <li>Contribuição para o ranqueamento das APIs, com controle de cliques;</li>
        <li>Acesso a um modal simples de informações.</li>
      </ul>

      <h2>2. Contas Cadastradas</h2>
      <ul>
        <li>Acesso completo à página da API ao clicar no modal simples;</li>
        <li>Capacidade de votar em APIs e eventos, ajudando na avaliação da qualidade;</li>
        <li>Capacidade de denunciar conteúdo.</li>
      </ul>

      <h2>3. Contas Pagas</h2>
      <ul>
        <li>Permissão para comentar nas APIs;</li>
        <li>Recebe emails sobre eventos e APIs, com base nos interesses e consumo anterior;</li>
        <li>Denúncias com maior relevância (prioridade);</li>
        <li>Acesso ao perfil de publicadores de APIs (com informações autorizadas);</li>
        <li>Possibilidade de cadastrar novas APIs (mediante custo de processamento por verificação de conteúdo).</li>
      </ul>

      <h2>4. Contas Acadêmicas</h2>
      <ul>
        <li>Professores e alunos podem registrar uma API "temporária" (mais informações abaixo);</li>
        <li>Professores possuem uma conta especial com código para agrupar alunos e ícone de instituição;</li>
        <li>Verificação do cadastro de professores por link institucional (local de trabalho);</li>
        <li>APIs "temporárias" permanecem ativas por até 1 semana e podem ser reativadas até 3 vezes;</li>
        <li>APIs removidas ficam armazenadas em uma área específica.</li>
      </ul>

      <h2>5. APIs Removidas e Desativadas</h2>
      <p>APIs removidas por violação dos Termos de Uso, ou por outros motivos, são retiradas do catálogo geral e exibidas como "removidas" (em cinza) na seção de <b>APIs Desativadas</b>.</p>
      <p>Ao clicar nas APIs removidas, será exibido o motivo da remoção, nome da API, categoria e descrição, enquanto informações como links, logo e dados sobre quem publicou ficam ocultos para preservar a privacidade.</p>

      <h2>6. Denúncias</h2>
      <p>As denúncias podem ser feitas em relação a: API criminosa, erros de requisição e outros. Ao enviar uma denúncia, seus dados poderão ser armazenados para possível (muito improvável) coleta de mais informações.</p>
      <p>O tempo entre as denúncias aumenta progressivamente para evitar sobrecarga no sistema, como por exemplo: a 2ª denúncia só pode ser feita após 2 minutos, a 3ª após 4 minutos, e assim por diante.</p>

      <h2>7. Comentários</h2>
      <p>Comentários publicados ficam como rascunho por 2 minutos, após isso se tornam permanentes;</p>
      <ul>
        <li>São aceitos letras, números e símbolos simples nos comentários;</li>
        <li>Dados enviados incluem o id do usuário, o comentário e o id da API.</li>
      </ul>
    </div>
  );
};