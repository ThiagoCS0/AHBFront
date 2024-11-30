import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { TemasContexto } from "../Temas/TemasContexto";
import { buscar_apis } from "../Servicos/APIs/APIs";
import ListaAPIs from "../../Corpo/Lista_APIs/ListaAPIs";
import Carregamento from "../Carregamento/Carregamento";
import Populares from "../../Corpo/Populares/Populares";
import Cabecalho from "../../Cabecalho/Cabecalho";
import Rodape from "../../Rodape/Rodape";
import Corpo from "../../Corpo/Corpo";

const nome_desta_pagina = import.meta.env.VITE_INICIAL;

export default function ComCabecalho({ token_valido, usuario }) {
  const [apis, def_apis] = useState([]);
  const [populares, def_populares] = useState([]);
  const [filtrado, def_filtrados] = useState([]);
  const [filtrando, def_filtrando] = useState(false);
  const [carregando, def_carregando] = useState(true);
  const [primeira_tentativa, def_pri_tentativa] = useState(true);

  useEffect(() => {
    try {
      const carregar_apis = async () => {
        if (apis.length === 0 && populares.length === 0) {
          const apis_populares = await buscar_apis(0, 5, "clickCount", "desc");
          const apis_totais = await buscar_apis(0, 20, "name", "asc");
          def_apis(apis_totais);
          def_populares(apis_populares);
          def_filtrados(apis_totais);
          def_carregando(apis_populares.length === 0 && apis_totais.length === 0);
          def_pri_tentativa(false);
        }
      };
      if (primeira_tentativa) {
        carregar_apis();
      } else {
        const tmp = setTimeout(() => {
          if (apis.length === 0 && populares.length === 0) {
            carregar_apis();
          }
        }, 2000);
        return () => clearTimeout(tmp);
      }
    } catch (erro) {
      meus_erros(import.meta.url.split('/').pop(), "CAT_CAR_APIs", erro);
    }
  }, [apis, populares]);

  useEffect(() => {
    if (populares.length > 0 && apis.length > 0) {
      def_carregando(false);
    }
  }, [populares, apis]);

  const filtragem_busca = (value) => {
    if (value.length > 0) {
      def_filtrando(true);
      def_filtrados([]);
      const filtragem_busca = apis.filter(
        (api) =>
          api.nome.toLowerCase().includes(value.toLowerCase()) ||
          api.descricao.toLowerCase().includes(value.toLowerCase())
      );
      def_filtrados(filtragem_busca);
    } else {
      def_filtrados(apis)
      def_filtrando(false);
    }
  };

  const filtragem_categoria = (value) => {
    if (value === "NENHUMA") {
      def_filtrados(apis);
      def_filtrando(false);
    } else {
      def_filtrando(true);
      def_filtrados([]);
      const filtragem_categorias = apis.filter(
        (api) => api.categoria.toLowerCase().includes(value.toLowerCase())
      );
      def_filtrados(filtragem_categorias);
    }
  };


  return (
    <TemasContexto>
      {carregando ? (
        <div className="tela_inteira alinhado">
          <Carregamento carregando={carregando} inicial={true}/>
        </div>
      ) : (
        <>
          <Cabecalho buscar={filtragem_busca} categorizar={filtragem_categoria} />
          <Corpo>
            {
              window.location.pathname === nome_desta_pagina ?
                <>
                  {!filtrando && <Populares populares={populares} />}
                  <ListaAPIs apis={filtrado} />
                  <Rodape fixar_abaixo={filtrando} />
                </>
                :
                <Outlet />
            }
          </Corpo>
        </>
      )}
    </TemasContexto>
  );
};