export function Erros(local, conteudo) {
 console.log("");
 console.log("-------- ERRO --------");
 console.log("");
 console.log(`>> Local: ${local}`);
 console.log(`>> Data e Hora: ${new Date().toLocaleString()}`);
 console.log("");
 if (conteudo instanceof Error) {
  console.log(`Mensagem: ${conteudo.message}`);
  console.log(`Stack: ${conteudo.stack}`);
 } else {
  console.log(conteudo);
 }
 console.log("-------- ---- --------");
 console.log("");
}