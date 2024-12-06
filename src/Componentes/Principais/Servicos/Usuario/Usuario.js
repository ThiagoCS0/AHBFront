import { meu_get } from "..//Backend/Conexao";
import { validar_token } from "../JWT/JWT"

export function usuario_id() {
  const token = validar_token();
  if (token) {
    const id = JSON.parse(atob(token.split('.')[1])).userId;
    return id;
  }
  return null;
}

export async function usuario_nome(completo = true) {
  const id_usuario = usuario_id();
  if (id_usuario) {
    const { status_get, dados_get } = await meu_get(`users/${id_usuario}`, true);
    if (!status_get && !dados_get) { return null; }

    if (status_get) {
      if (Math.floor(status_get / 100) !== 2) { return null; }

      if (dados_get) {
        if (completo) {
          return dados_get.publicname;
        } else {
          return dados_get.publicname ?
            dados_get.publicname.length > 8 ?
              dados_get.publicname.substring(0, 8) + "..."
              : dados_get.publicname
            : null
        }
      }
    }
  }
  return null;
}