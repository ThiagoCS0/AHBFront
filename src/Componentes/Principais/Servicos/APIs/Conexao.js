import { Erros } from "../../Erros/Erros"
import { lerToken } from "../JWT/JWT";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function meu_post(url, usar_token, corpo) {
  try {
    console.log("Enviando requisição para:", `${API_URL}/${url}`);
    const resposta = await fetch(`${API_URL}/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo)
    });

    console.log("Resposta recebida:", resposta);
    console.log(resposta.status);

    const status_post = resposta.status;
    const dados_post = await resposta.json();

    return { status_post, dados_post };
  } catch (error) {
    console.error("Erro na requisição:", error);
    Erros(import.meta.url.split('/').pop(), new Error(`ERR_POST: ${error.message}`));
  }
}


export async function meu_get(url, usar_token) {
  try {
    const token = usar_token ? lerToken() : "";
    const resposta = await fetch(`${API_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(usar_token ? { "Authorization": `Bearer ${token}` } : {})
      },
    });

    const status_get = resposta.status;
    const dados_get = await resposta.json();
    return { status_get, dados_get };

  } catch (error) {
    Erros(import.meta.url.split('/').pop(), new Error(`ERR_GET: ${error.message}`));
  }
}
