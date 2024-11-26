import { MeusErros } from "../../Erros/MeusErros"
import { meu_get } from "./Conexao";

export const buscarAPIs = async (pagina, tamanho, organizar, ordem) => {

 try {
  const { status_get, dados_get } = await meu_get(`apis?page=${pagina}&size=${tamanho}&organizar=${organizar},${ordem}`);

  if (status_get !== 200) {
   MeusErros(import.meta.url.split('/').pop(), new Error(`BSC_APIs: ${status_get}`));
  }

  if (dados_get && dados_get.content) {
   return dados_get.content.map((api) => ({
    id: api.id,
    nome: api.name,
    descricao: api.description,
    metodos: api.methods,
    link: api.link,
    categoria: api.categoria,
    clicks: api.clickCount,
    imagem: api.icon,
    publicador: api.userId.id
   }));
  }

  return [];

 } catch (erro) {

  MeusErros(import.meta.url.split('/').pop(), new Error("CAT_BSC_API"));

  return [];
 }
};

export const clicarAPI = async (apiId) => {
 try {
  const resposta = await meu_get(`apis/${apiId}/clicar`);
  if (status_get !== 200) { return; }
 } catch (error) {
  MeusErros(import.meta.url.split('/').pop(), new Error("CAT_CLK_API"));
 }
};