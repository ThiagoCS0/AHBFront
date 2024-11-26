import { MeusErros } from "../../Erros/MeusErros"
import { ler_token, validar_token } from "../JWT/JWT";

const API_URL = "https://gui-video1.onrender.com/api";
// import.meta.env.VITE_BACKEND_URL;

export async function meu_get(url, usar_token = false, nosso_servidor = true) {
  try {
    const token = usar_token ? validar_token() : "";
    const resposta = await fetch(nosso_servidor ? `${API_URL}/${url}` : url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(usar_token ? { "Authorization": `Bearer ${token}` } : {})
      },
    });

    const status_get = resposta.status;
    const dados_get = await resposta.json();
    return { status_get, dados_get };

  } catch (erro) {
    MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_CNX_GET: ${erro}`));
    return;
  }
}

export async function meu_post(url, corpo, usar_token = false) {
  try {
    const token = usar_token ? validar_token() : "";
    const resposta = await fetch(`${API_URL}/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo)
    });

    const status_post = resposta.status;
    const dados_post = await resposta.json();

    return { status_post, dados_post };
  } catch (erro) {
    MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_CNX_POS: ${erro}`));
    return;
  }
}

export async function meu_put(url, corpo, usar_token = false) {
  try {
    
    const token = usar_token ? validar_token() : "";
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
    MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_CNX_PUT: ${erro}`));
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
    }
  } catch (erro) {
    MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_CNX_DEL: ${erro}`));
    return;
  }
}