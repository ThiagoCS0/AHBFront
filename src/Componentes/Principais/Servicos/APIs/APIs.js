import { meus_erros } from "../../Erros/MeusErros";
import { meu_get } from "../Backend/Conexao";

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
    if (relatar_erros) {
      meus_erros(import.meta.url.split('/').pop(), "CAT_API_BSC_API", erro);
    }
    return [];
  }
};

export async function clicar_apis(apiId) {
  try {
    const { status_get } = await meu_get(`apis/${apiId}/clicar`);
    if (Math.floor(status_get / 100) !== 2) { return; }
  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), "CAT_API_CLK_API", erro);
  }
};

function formatando_metodos(texto) {
  const urls = [];
  console.log("------------------");
  // texto = texto.replace(/https?:\/\/[^\s]+/g, url => { urls.push(url); return `<<URL${urls.length - 1}>>`; });
  // texto = texto.replace(/([a-zA-Z_]+)=([^,\}\]]*)/g, '"$1":"$2"').replace(/"get":"\[/, '"get":[');
  // texto = texto.replace(/<<URL(\d+)>>/g, (_, index) => urls[index]);
  // texto = texto.replace("[{titulo=",'[{\"titulo\"=\"');
  console.log(texto);
  
  // texto = texto.replace(/=/g, ':');
  
  // // texto = JSON.stringify(texto, (_, value) => { if (typeof value === "boolean") { return value.toString(); } return value; }, 2);
  // ["titulo:", "url:", "header:", "body:"].forEach(tmp => { texto = texto.replace(new RegExp(tmp, 'g'), `"${tmp.replace(":", "\":")}"`); });
  // ["get", "post", "delete", "put", "patch", "options", "head", "trace", "connect", "ver_site"].forEach(tmp => { texto = texto.replace(new RegExp(`${tmp}:`, "g"), `"${tmp}":`) });
  // // texto = texto.replace(/url\":\"/g, 'url\":');
  // // texto = texto.replace(/token:false/g, '"token":false');
  // // texto = texto.replace(/token:true/g, '"token":true');
  // // texto = texto.replace(/:",/g, ':"",');
  // // texto = texto.replace(/(:*?)(?=, "url|$)/g, '"');
  // // texto = texto.replace(/(:*?)(?=, "header|$)/g, '"');
  // // texto = texto.replace(/(https?:\/\/.*?)(?=,|$)/g, '"$1');
  // // texto = texto.replace(/"""/g, "\"\"")
  // // texto = texto.replace(/}", {"/g, "}, {\"")
  
  
  
  return texto;
}
export function traduzir_dados(dados) {

  if (Array.isArray(dados)) {
    return dados.map(api => ({
      id: api.id,
      nome: api.name,
      descricao: api.description,
      metodos: formatando_metodos(api.methods),
      link: api.link,
      categoria: api.categoria,
      clicks: api.clickCount,
      imagem: api.icon,
      publicador: api.userId.id,
      data: api.dataCriacao
    }));
  } else {
    return {
      id: dados.id,
      nome: dados.name,
      descricao: dados.description,
      metodos: formatando_metodos(dados.methods),
      link: dados.link,
      categoria: dados.categoria,
      clicks: dados.clickCount,
      imagem: dados.icon,
      publicador: dados.userId.id,
      data: dados.dataCriacao
    }
  }
}
