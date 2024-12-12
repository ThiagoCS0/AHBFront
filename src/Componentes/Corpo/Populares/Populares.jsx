import { useEffect, useRef, useState } from "react";
import Visualizador from "../../Modal/API_Visualizador/Visualizador";
import API from "../API/API";
import "./Populares.css";

export default function Populares({ dados_offline, populares }) {
  const [api_selecionada, def_api_selecionada] = useState(null);
  const [visualizar, def_visualizar] = useState(false);
  const [foco, def_foco] = useState(0);
  const total_itens = populares.length;
  const intervaloRef = useRef(null);
  const duracao = 3;

  useEffect(() => {
    const carousel = document.getElementById("carousel");

    if (!carousel) {
      return;
    }

    iniciarIntervalo();

    carousel.addEventListener("mouseover", pausarIntervalo);
    carousel.addEventListener("mouseout", iniciarIntervalo);

    return () => {
      pausarIntervalo();
      if (carousel) {
        carousel.removeEventListener("mouseover", pausarIntervalo);
        carousel.removeEventListener("mouseout", iniciarIntervalo);
      }
    };
  }, [foco]);

  const iniciarIntervalo = () => {
    if (!intervaloRef.current) {
      intervaloRef.current = setInterval(() => {
        avancar();
      }, 1000 * duracao);
    }
  };

  const pausarIntervalo = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
  };

  const avancar = () => {
    def_foco((foco + 1) % total_itens);
  };

  const ir_para = (indice) => {
    def_foco(indice);
  };

  const itensVisiveis = (i) => {
    if (i === (foco - 2 + total_itens) % total_itens) return "mais_esquerda";
    if (i === (foco - 1 + total_itens) % total_itens) return "esquerda";
    if (i === foco) return "centro";
    if (i === (foco + 1) % total_itens) return "direita";
    if (i === (foco + 2) % total_itens) return "mais_direita";
    return "oculto";
  };

  const visualizarItem = (api) => {
    def_api_selecionada(api ? api : null);
  };

  const fechar = () => {
    def_visualizar(false);
  };

  return (
    <div id="populares">
      <div id="carousel">
        {
          populares.map((api, i) => (
            <API
              dados_offline={dados_offline}
              api={api}
              key={api.id}
              classe={`populares_itens ${itensVisiveis(i)}`}
              click={() => {
                ir_para(i);
                visualizarItem(api);
                def_visualizar(true);
              }} />
          ))
        }
      </div>
      <div id="populares_botoes">
        {populares.map((_, i) => (
          <button
            key={i}
            className={foco === i ? "ativo" : ""}
            onClick={() => ir_para(i)}
          ></button>
        ))}
      </div>
      {visualizar && api_selecionada && <Visualizador dados_offline={dados_offline} api={api_selecionada} fechar={fechar} />}
    </div>
  );
}
