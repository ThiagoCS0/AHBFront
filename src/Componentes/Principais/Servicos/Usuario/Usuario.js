import { meu_get } from "../APIs/Conexao";
import { validar_token } from "../JWT/JWT"

export function usuario_id() {
  const token = validar_token();
  if (token) {
    const id = JSON.parse(atob(token.split('.')[1])).userId;
    return id;
  }
  return "";
}

export async function usuario_nome() {
  const id_usuario = usuario_id();

  if (id_usuario !== "") {
    const { status_get, dados_get } = await meu_get(`users/${id_usuario}`, true);

    if (status_get !== 200) { return ""; }

    if (dados_get) {
      return dados_get.publicname ?
        dados_get.publicname.length > 8 ?
          dados_get.publicname.substring(0, 8) + "..." :
          dados_get.publicname
        : ""
    }
  }
    return "";
}