import { meus_erros } from "../../Erros/MeusErros";
import { validar_token } from "../JWT/JWT";

const API_URL = import.meta.env.VITE_URL;

export async function meu_get(url, usar_token = false, nosso_servidor = true) {
  let dados_get = null;
  let status_get = 0;

  try {
    const token = usar_token ? validar_token() : "";
    if (usar_token && !token) { return { status_get: null, dados_get: null }; }
    
    const resposta = await fetch(nosso_servidor ? `${API_URL}/${url}` : url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(usar_token ? { "Authorization": `Bearer ${token}` } : {})
      },
    });

    status_get = resposta.status;

    if (!resposta.ok) { return { status_get, dados_get: null }; }

    const tipo_conteudo = resposta.headers.get("Content-Type");
    if (tipo_conteudo && tipo_conteudo.includes("application/json")) { dados_get = await resposta.json(); }
    else {
      // meus_erros(import.meta.url.split('/').pop(), "CNX_GET_JSN: " + tipo_conteudo); // Resposta não é JSON
      dados_get = null;
    }

  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), `CAT_CNX_GET: ${erro}`);
    dados_get = null;
    status_get = 500;
  }

  return { status_get, dados_get };
}

export async function meu_post(url, corpo, usar_token = false) {
  let status_post = 0, dados_post = "";
  try {
    const token = usar_token ? validar_token() : "";
    if (usar_token && !token) { return { status_get: null, dados_get: null }; }

    const resposta = await fetch(`${API_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(usar_token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: JSON.stringify(corpo)
    });
    dados_post = await resposta.json();

    if (Math.floor(resposta.status / 100) !== 2) {
      return { status_post: resposta.status, dados_post: "" }
    }
    status_post = resposta.status;
    return { status_post, dados_post };
  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), `CAT_CNX_POS: ${erro}`);
    return;
  }
}

export async function meu_put(url, corpo, usar_token = false) {
  try {

    const token = usar_token ? validar_token() : "";
    if (!token) { return { status_put: null } }

    const resposta = await fetch(`${API_URL}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(usar_token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: JSON.stringify(corpo)
    });

    const status_put = resposta.status;

    return { status_put };
  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), `CAT_CNX_PUT: ${erro}`);
    return;
  }
}


export async function meu_delete(url) {
  try {
    const token = validar_token();
    if (token) {
      const resposta = fetch(`${API_URL}/${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      return (await resposta).status;
    } else {
      return null;
    }
  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), `CAT_CNX_DEL: ${erro}`);
    return;
  }
}