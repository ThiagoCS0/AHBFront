import React, { useEffect, useState } from "react";

export default function Carregamento({ carregando, inicial = false, texto = "Carregando..." }) {
  const [texto_carregamento, def_texto_carregamento] = useState(texto);
  const [animacao, def_animacao] = useState("animacao-normal");

  useEffect(() => {
    let tmps = [];

    const atualizar_carregamento = () => {
      if (inicial) {
        tmps.push(setTimeout(() => { def_animacao("animacao-normal"); def_texto_carregamento("📡 Tentando me conectar 📡 "); }, 8000));
        tmps.push(setTimeout(() => { def_texto_carregamento("🛰️ Vou tentar novamente 🛰️"); }, 15000));
        tmps.push(setTimeout(() => { def_texto_carregamento("🚧 Em manutenção! 🚧"); def_animacao("animacao-caindo"); }, 30000));
      } else {
        tmps.push(setTimeout(() => { def_animacao("animacao-normal"); }));
      }
    };

    if (carregando) {
      atualizar_carregamento();
    }
    
    return () => {
      tmps.forEach(tmp => clearTimeout(tmp));
    };
  }, [carregando]);

  return (
    <div id="container_carregando">
      <div id="container_carregando_pontos">
        <div id="container_carregando_pontos">
          <span className={`carregando_pontos ${animacao}`} style={{ animationDelay: "0s" }}></span>
          <span className={`carregando_pontos ${animacao}`} style={{ animationDelay: "0.2s" }}></span>
          <span className={`carregando_pontos ${animacao}`} style={{ animationDelay: "0.4s" }}></span>
        </div>
      </div>
      <br />
      <p id="texto_carregando">{texto_carregamento}</p>
    </div>
  )
}