import { MeusErros } from "../../Erros/MeusErros"
import { ler_token, validar_token } from "../JWT/JWT";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function meu_post(url, usar_token, corpo) {
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
    MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_ERR_POS: ${error.message}`));
    return;
  }
}

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
    MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_ERR_GET: ${erro.message}`));
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
    MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_ERR_DEL: ${error.message}`));
    return;
  }
}