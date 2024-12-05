import React, { useEffect, useState } from "react";

export default function Carregamento({ carregando, inicial = false, texto = "Carregando..." }) {
  const [texto_carregamento, def_texto_carregamento] = useState(texto);
  const [animacao, def_animacao] = useState("animacao-normal");
  const [tela_pequena, def_tela_pequena] = useState(window.innerWidth < 768);

  useEffect(() => {
    const verificando_tamnho_tela = () => { def_tela_pequena(window.innerWidth < 768); };
    // Adiciona o event listener para redimensionamento
    window.addEventListener('resize', verificando_tamnho_tela);
    return () => {
      window.removeEventListener('resize', verificando_tamnho_tela);
    };
  }, []);

  useEffect(() => {
    let tmps = [];

    const atualizar_carregamento = () => {
      if (inicial) {
        tmps.push(setTimeout(() => {
          def_animacao("animacao-normal");
          def_texto_carregamento(
            tela_pequena
              ? <p>📡<br /> Tentando me conectar</p>
              : <p>📡 Tentando me conectar 📡</p>
          );
        }, 8000));

        tmps.push(setTimeout(() => {
          def_texto_carregamento(
            tela_pequena
              ? <p>🛰️<br /> Vou tentar novamente</p>
              : <p>🛰️ Vou tentar novamente 🛰️</p>
          );
        }, 15000));

        tmps.push(setTimeout(() => {
          def_texto_carregamento(
            tela_pequena
              ? <p>🚧<br /> Em manutenção</p>
              : <p>🚧 Em manutenção! 🚧</p>
          );
          def_animacao("animacao-caindo");
        }, 30000));
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
  }, [carregando, inicial, tela_pequena]);

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
      {texto_carregamento}
    </div>
  );
}