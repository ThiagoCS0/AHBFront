import { meu_post } from "../Backend/Conexao";
import { meus_erros } from "../../Erros/MeusErros";

export function salvar_token(token) {
  try {
    const expira = new Date();
    expira.setHours(expira.getHours() + 1); // Expira em 1 hora

    // Salva o token no cookie com Secure e SameSite
    document.cookie = `autenticado=${token}; path=/; expires=${expira.toUTCString()}; Secure; SameSite=Strict`;
  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), "CAT_JWT_SLV", erro);
  }
}

export function ler_token() {
  try {
    const nome_cookie = "autenticado=";
    const cookies_decodificados = document.cookie.split(';');

    for (let i = 0; i < cookies_decodificados.length; i++) {
      let cookie = cookies_decodificados[i].trim();
      if (cookie.indexOf(nome_cookie) === 0) {
        return cookie.substring(nome_cookie.length, cookie.length);
      }
    }

    return null; // Token não encontrado

  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), "CAT_JWT_LER", erro);
    return null;
  }
}

export async function atualizar_token() {
  // Envia o refresh token para o backend para obter um novo token de acesso
  /*
    try {
      meu_post("/api/atualizar_token");
      const resposta = await fetch("/api/atualizar_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Necessário para enviar cookies
      });
  
      if (!resposta.ok) {
        const erro = await resposta.text();
        meus_erros(import.meta.url.split('/').pop(), `JWT_ATL: ${erro}`);
        return;
      }
  
      const dados = await resposta.json();
      const novoToken = dados.token;
  
      // Salva o novo token de acesso
      salvar_token(novoToken);
  
    } catch (erro) {
      meus_erros(import.meta.url.split('/').pop(), "CAT_JWT_ATL", erro);
      // Pode redirecionar para login ou exibir mensagem de erro
    }
  
    /*
    BackEnd
    
    
    @PostMapping("/atualizar_token")
  public ResponseEntity<?> atualizar_token(@CookieValue("refreshToken") String refreshToken) {
      // Verifique a validade do refresh token
      boolean valido = verificarRefreshToken(refreshToken);
      if (!valido) {
          return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Token inválido ou expirado");
      }
  
      // Gere um novo token de acesso
      String novoTokenAcesso = gerarNovoTokenAcesso();
  
      // Retorne o novo token de acesso
      return ResponseEntity.ok(Collections.singletonMap("token", novoTokenAcesso));
  }
    
    */
}

export function validar_token(token_passado = null) {
  try {
    const token = token_passado ? token_passado : ler_token();
    if (!token) { return null; }

    const partes = token.split('.');
    if (partes.length !== 3) { return null; }

    const data_expiracao_token = JSON.parse(atob(partes[1]));
    const agora = Math.floor(Date.now() / 1000);

    if (data_expiracao_token.exp < agora) { return null; } // Expirado

    return token; // Valido

  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), "CAT_JWT_VAL", erro);
    return null;
  }
}

export function remover_token() {
  try {
    document.cookie = "autenticado=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict";
  } catch (erro) {
    meus_erros(import.meta.url.split('/').pop(), "CAT_JWT_REM", erro);
  }
}