import { meus_erros } from "../../Erros/MeusErros";
import { meu_get } from "./Conexao";

export const buscar_apis = async (pagina, tamanho, organizar, ordem) => {

 try {
  const { status_get, dados_get } = await meu_get(`apis?page=${pagina}&size=${tamanho}&organizar=${organizar},${ordem}`);

  if (Math.floor(status_get / 100) !== 2) {
   meus_erros(import.meta.url.split('/').pop(), `BSC_APIs: ${status_get}`);
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

  meus_erros(import.meta.url.split('/').pop(), "CAT_API_BSC_API", erro);

  return [];
 }
};

export const clicar_apis = async (apiId) => {
 try {
  const { status_get } = await meu_get(`apis/${apiId}/clicar`);
  if (Math.floor(status_get / 100) !== 2) { return; }
 } catch (erro) {
  meus_erros(import.meta.url.split('/').pop(), "CAT_API_CLK_API", erro);
 }
};