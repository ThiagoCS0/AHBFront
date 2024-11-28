export function meus_erros(local, conteudo, erro = null) {
 console.log("");
 console.log("---------------- ERRO ----------------");
 console.log(`>> Local: ${local}`);
 console.log(`>> Data e Hora: ${new Date().toLocaleString()}`);
 console.log("");
 if (conteudo.startsWith("CAT_")) {
  console.log(conteudo);
  console.log(`Mensagem: ${erro.message}`);
  console.log(`Stack: ${erro.stack}`);
 } else {
  console.log(conteudo);
 }
 console.log("---------------- ---- ----------------");
 console.log("");
}