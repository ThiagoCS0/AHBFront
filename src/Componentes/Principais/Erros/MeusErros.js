export function meus_erros(local, conteudo, erro = null) {
 console.log("");
 console.log("---------------- ERRO ----------------");
 console.log(`>> Local: ${local}`);
 console.log(`>> Data e Hora: ${new Date().toLocaleString()}`);
 console.log("");
 if (conteudo.startsWith("CAT_")) {
  console.log(`Mensagem: ${conteudo.message}`);
  console.log(`Stack: ${conteudo.stack}`);
 console.log("");
 console.log(`Completa: ${conteudo}`);
 } else {
  console.log(conteudo);
 }
 console.log("---------------- ---- ----------------");
 console.log("");
}