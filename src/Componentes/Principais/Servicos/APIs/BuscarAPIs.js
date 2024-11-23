const API_URL = import.meta.env.VITE_BACKEND_URL;

import { Erros } from "../../Erros/Erros"

export const buscarAPIs = async (pagina, tamanho, organizar, ordem) => {

 try {
  const resposta = await fetch(
   `${API_URL}/apis?page=${pagina}&size=${tamanho}&organizar=${organizar},${ordem}`
  );

  if (!resposta.ok) {
   Erros(import.meta.url.split('/').pop(), new Error(`Erro ao buscar APIs: ${resposta.statusText}`));
  }

  const dados = await resposta.json();

  if (dados && dados.content) {
   return dados.content.map((api) => ({
    id: api.id,
    nome: api.name,
    descricao: api.description,
    metodos: api.methods,
    link: api.link,
    categoria: api.categoria,
    clicks: api.clickCount,
    imagem: api.icon,
    publicado: api.userId.id
   }));
  }

  return [];

 } catch (error) {

  Erros(import.meta.url.split('/').pop(), error)

  return [];
 }
};