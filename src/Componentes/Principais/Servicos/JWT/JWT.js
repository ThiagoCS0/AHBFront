import { Erros } from "../../Erros/Erros"

export function salvarToken(token) {
  try {
    const expira = new Date();
    expira.setHours(expira.getHours() + 1); // Expira em 1 hora

    // Salva o token no cookie com Secure e SameSite
    document.cookie = `autenticado=${token}; path=/; expires=${expira.toUTCString()}; Secure; SameSite=Strict`;
  } catch (erro) {
    Erros(import.meta.url.split('/').pop(), erro);
  }
}

export function lerToken() {
  try {
    const nomeCookie = "autenticado=";
    const cookiesDecodificados = document.cookie.split(';');

    for (let i = 0; i < cookiesDecodificados.length; i++) {
      let cookie = cookiesDecodificados[i].trim();
      if (cookie.indexOf(nomeCookie) === 0) {
        return cookie.substring(nomeCookie.length, cookie.length);
      }
    }

    return null; // Token não encontrado

  } catch (erro) {
    Erros(import.meta.url.split('/').pop(), erro);
    return null;
  }
}

export async function atualizarToken() {
  try {
    // Envia o refresh token para o backend para obter um novo token de acesso
    const resposta = await fetch("/api/atualizar_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Necessário para enviar cookies
    });

    if (!resposta.ok) {
      // Exibe o erro e retorna
      const erro = await resposta.text();
      Erros(import.meta.url.split('/').pop(), new Error(erro));
      return;
    }

    const dados = await resposta.json();
    const novoToken = dados.token; // Recebe o novo token de acesso

    // Salva o novo token de acesso
    salvarToken(novoToken);

  } catch (erro) {
    Erros(import.meta.url.split('/').pop(), erro);
    // Pode redirecionar para login ou exibir mensagem de erro
  }

  /*
  BackEnd
  
  
  @PostMapping("/atualizar_token")
public ResponseEntity<?> atualizarToken(@CookieValue("refreshToken") String refreshToken) {
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

export function validarToken(token_passado) {
  try {
    const token = token_passado ? token_passado : lerToken();
    if (!token) { return false; }

    const partes = token.split('.');
    if (partes.length !== 3) { return false; }

    const cargaUtil = JSON.parse(atob(partes[1]));
    if (cargaUtil.exp < Math.floor(Date.now() / 1000)) { return false; } // Expirado

    return token; // Valido

  } catch (erro) {
    Erros(import.meta.url.split('/').pop(), erro);
    return false;
  }
}

export function removerToken() {
  try {
    document.cookie = "autenticado=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict";
  } catch (erro) {
    Erros(import.meta.url.split('/').pop(), erro);
  }
}