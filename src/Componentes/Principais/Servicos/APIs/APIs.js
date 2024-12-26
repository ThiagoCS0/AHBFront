import { meus_erros } from "../../Erros/MeusErros";
import { meu_get, meu_post } from "../Backend/Conexao";

export async function buscar_apis(pagina, tamanho, organizar, ordem, relatar_erros = true) {

  try {
    const { status_get, dados_get } = await meu_get(`apis?page=${pagina}&size=${tamanho}&organizar=${organizar},${ordem}`, false, true, false);
    if (Math.floor(status_get / 100) !== 2) {
      if (relatar_erros) { meus_erros(import.meta.url.split('/').pop(), `BSC_APIs: ${status_get}`); }
      return { status_get: status_get, dados_get: null };
    }
    if (dados_get && dados_get.content) {
      return { status_get, dados_get: dados_get.content };
    }
    return [];
  } catch (erro) {
    if (relatar_erros) { meus_erros(import.meta.url.split('/').pop(), "CAT_API_BSC_API", erro); }
    return [];
  }
};

export async function clicar_apis(apiId) {
  try {
    const { status_get } = await meu_post(`apis/${apiId}/clicar`, 'click');
    if (Math.floor(status_get / 100) !== 2) { return; }
  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), "CAT_API_CLK_API", erro);
  }
};

export async function validar_imagem(imagem, dados_offline) {
  if (imagem) {
    const im = async () => {
      const resposta = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(imagem);
        img.onerror = () => resolve("../../../../src/Recursos/apis/imagem_padrao.png");
        img.src = imagem;
      });
      return await resposta;
    }
    if (dados_offline) {
      return `../../../../src/Recursos/apis/${imagem}.png`;
    } else {
      return await im();
    }
  }
  return "../../../../src/Recursos/apis/imagem_padrao.png";
}

export function traduzir_dados(dados) {
  if (Array.isArray(dados)) {
    return dados.map(api => ({
      id: api.id,
      nome: api.name,
      descricao: api.description,
      metodos: api.methods,
      link: api.link,
      categoria: api.categoria,
      cliques: api.clickCount,
      imagem: api.icon,
      publicador: api.userId.id,
      data: api.dataCriacao
    }));
  }
}