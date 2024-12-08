import { remover_token, salvar_token, validar_token } from "../JWT/JWT";
import { meus_erros } from "../../Erros/MeusErros";
import { meu_post } from "..//Backend/Conexao";

export async function acessar(usuario, senha) {
 try {
  const { status_post, dados_post } = await meu_post("auth/login", { "username": usuario, "password": senha });

  if (status_post != 200) {
   return mensagem_erro(status_post, "ACE");
  }

  if (dados_post) {
   const token_valido = validar_token(dados_post.token);
   if (!token_valido) { remover_token(); return { valido: false, mesagem: null }; }

   salvar_token(token_valido)
   return { valido: true };
  }

 } catch (erro) {
  meus_erros(import.meta.url.split('/').pop(), `CAT_ACS_ACS: ${erro}`);
  return { valido: false, mesagem: "Verifique os dados, já está cadastrado?" };
 }
};

export async function cadastrar(dados_usuario) {
 try {
  const { status_post } = await meu_post("auth/signup", dados_usuario);

  if (Math.floor(status_post / 100) !== 2) {
   return mensagem_erro(status_post, "CAD");
  }
  return await acessar(dados_usuario.username, dados_usuario.password);
 } catch (error) {
  return { valido: false, mesagem: "Estamos em manutenção!" };
 }
}

function mensagem_erro(status, erro) {
 let mensagem = "Estamos em manutenção!";
 if (status === 403) { mensagem = (erro === "CAD" ? "Dados já cadastrados!" : "Dados incorretos, já está cadastrado?"); } else {
  const tipo_erro = Math.floor(status / 100);
  switch (tipo_erro) {
   case 4: mensagem = `Dados incorretos${erro === "CAD" ? " ou já cadastrados" : ""}!`; break
   case 3: meus_erros(import.meta.url.split('/').pop(), "ACE_" + erro + "_3XX"); break;
   default: meus_erros(import.meta.url.split('/').pop(), "ACE_" + erro + "_?"); break;
  }
 }

 return { valido: false, mensagem }
}