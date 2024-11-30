export default function InformacoesRodape() {
 const tela_grande = window.screen.width > 1000;
 const ano = new Date().getFullYear();
 
 return (
  <div id="infor_abh">
   <p><b>© {ano} {tela_grande ? "API Hub Brasil" : "AHB"}</b> Todos os direitos reservados</p>
   <div>
    {tela_grande ?
     <a href="">Ajude o projeto <b>Doando</b></a>
     :
     <a href="">Fazer <b>Doação</b></a>}
    <div>
     <a href="">Sobre <b>AHB</b></a>
     <a href="">Termos de Uso</a>
    </div>
   </div>
  </div>
 )
}