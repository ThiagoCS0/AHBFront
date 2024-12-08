import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Carregamento from "../Carregamento/Carregamento";
import Parceiros from "../../AHB/Parceiros/Parceiros";
import Doacao from "../../AHB/Doacao/Doacao";
import Ranks from "../../AHB/Ranks/Ranks";
import Sobre from "../../AHB/Sobre/Sobre";
import Termos from "../../AHB/Termos/Termos";
import Perfil from "./Privado/Perfil/Perfil";
import MinhasAPIs from "./Privado/MinhasAPIs/MinhasAPIs";
import "./Gerenciar.css";
import { validar_token } from "../Servicos/JWT/JWT";

export default function Gerenciar() {
  const [nome_pagina, def_nome_pagina] = useState("");
  const [carregando, def_carregando] = useState(true);
  const [pagina, def_pagina] = useState("");
  const [aba, def_aba] = useState("");
  const [editar_api, def_editar_api] = useState(null);
  const [exibir_modal_editar, def_exibir_modal_editar] = useState(false);

  useEffect(() => {
    window.addEventListener("mudanca_sessionStorage", mudanca_sessionstorage);
    mudanca_sessionstorage();
    def_carregando(false);
    return () => {
      window.removeEventListener("sessionStorageChange", mudanca_sessionstorage);
    };
  }, []);

  const mudanca_sessionstorage = () => {
    let pagina_atual = sessionStorage.getItem("Paginas");

    try {
      if (pagina_atual) {
        let possivel_objeto = null;

        if (pagina_atual.includes("{") && pagina_atual.includes("}")) {
          possivel_objeto = JSON.parse(pagina_atual);
        }

        if (possivel_objeto !== null && typeof possivel_objeto === "object") {
          def_aba(possivel_objeto.aba);
          def_pagina(possivel_objeto.pag);
          pagina_atual = possivel_objeto.pag;
        } else {
          def_pagina(pagina_atual);
        }
      }
      aguardar_elemento(pagina_atual, opcao_ativa);
    } catch {
      def_pagina(pagina_atual);
      aguardar_elemento(pagina_atual, opcao_ativa);
    }
  };

  const aguardar_elemento = (pagina_atual, saida) => {
    let tentativas = 0;
    const verificar = () => {
      const elemento = document.getElementById(pagina_atual);
      if (elemento) {
        saida(elemento);
      } else if (tentativas < 10) {
        tentativas++;
        setTimeout(verificar, 100);
      }
    };
    verificar();
  };

  useEffect(() => {
    if (validar_token()) {
      switch (pagina) {
        case "Perfil":
          def_nome_pagina("Perfil");
          break;
        case "MinhasAPIs":
          def_nome_pagina("Minhas APIs");
          break;
        default:
          break;
      }
    }

    switch (pagina) {
      case "Parceiros":
        def_nome_pagina("Parceiros");
        break;
      case "Doacao":
        def_nome_pagina("Doação");
        break;
      case "Ranks":
        def_nome_pagina("Ranks");
        break;
      case "Sobre":
        def_nome_pagina("AHB - API HUB BRASIL");
        break;
      case "Termos":
        def_nome_pagina("Termos de Uso");
        break;
      default:
        break;
    }
  }, [pagina]);

  const chamar_modal_nova_api = () => {
    def_editar_api(null);
    def_exibir_modal_editar(true);
  };

  const opcao_ativa = (elemento) => {
    if (elemento) {
      document.querySelectorAll("#gerenciar_menu a").forEach((a) => a.classList.remove("ativo"));
      elemento.classList.add("ativo");
    }
  };

  const alterar_componente = (elementos, pag_aba) => {
    sessionStorage.setItem("Paginas", elementos ? elementos : pag_aba);
    const elemento = elementos ? elementos : JSON.parse(pag_aba).pag;
    def_pagina(elemento);
    opcao_ativa(document.getElementById(`${elemento}`))
    window.dispatchEvent(new Event("mudanca_sessionStorage")); // Dispara evento customizado
  };

  const componentes = () => {
    if (validar_token()) {
      switch (pagina) {
        case "Perfil":
          return <Perfil />;
        case "MinhasAPIs":
          return;
        default:
          break;
      }
    }

    switch (pagina) {
      case "Parceiros": return <Parceiros aba={aba || "parceiros_instituicoes"} />;
      case "Doacao":
        return <Doacao />;
      case "Ranks":
        return <Ranks aba={aba || "ranks_votadas"} />;
      case "Sobre":
        return <Sobre />;
      case "Termos":
        return <Termos />;
      default:
        break;
    }
  };

  return carregando ? (
    <Carregamento carregando={carregando} />
  ) : (
    <div id="gerenciar">
      <div id="gerenciar_menu">
        {validar_token() && (
          <>
            <Link id="Perfil" onClick={(e) => alterar_componente(e.target.id)}>Perfil</Link>
            <Link id="MinhasAPIs" onClick={(e) => alterar_componente(e.target.id)}>Minhas APIs</Link>
          </>
        )}
        {/* <Link id="Parceiros" onClick={() => alterar_componente(null, JSON.stringify({ pag: "Parceiros", aba: "parceiros_instituicoes" }))}>Parceiros</Link> */}
        <Link id="Doacao" onClick={(e) => alterar_componente(e.target.id)}>Doação</Link>
        <Link id="Ranks" onClick={() => alterar_componente(null, JSON.stringify({ pag: "Ranks", aba: "ranks_populares" }))}>Ranks</Link>
        <Link id="Sobre" onClick={(e) => alterar_componente(e.target.id)}>Sobre</Link>
        <Link id="Termos" onClick={(e) => alterar_componente(e.target.id)}>Termos</Link>
      </div>
      <div id="gerenciar_conteudo">
        <h1 className="gerenciar_titulos ondulacao-1">{nome_pagina}</h1>
        {pagina === "MinhasAPIs" && <button id="nova_api" onClick={chamar_modal_nova_api}></button>}
        <div className="gerenciar_pagina">
          {pagina === "MinhasAPIs" ?
            <MinhasAPIs
              editar_api={editar_api}
              exibir_modal_editar={exibir_modal_editar}
              def_editar_api={def_editar_api}
              def_exibir_modal_editar={def_exibir_modal_editar} />
            :
            componentes()
          }
        </div>
      </div>
    </div>
  );
}