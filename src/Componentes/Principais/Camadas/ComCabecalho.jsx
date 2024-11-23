import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TemasContexto } from "../Temas/TemasContexto";
import { buscarAPIs } from "../Servicos/APIs/BuscarAPIs";
import Cabecalho from "../../Cabecalho/Cabecalho"
import Corpo from "../../Corpo/Corpo"

const ComCabecalho = () => {
  const [apis, def_apis] = useState([]);
  const [populares, def_populares] = useState([]);
  const [populares_tmp, def_populares_tmp] = useState([]);
  const local = useLocation();
  const [filtros, def_filtros] = useState([]);
  const navegar = useNavigate();
  const [carregando, def_carregando] = useState(true);
  const [primeira_tentativa, def_pri_tentativa] = useState(true);
  const [texto_carregamento, def_texto_carregamento] = useState("Carregando...");
  const [animacao, def_animacao] = useState("animacao-normal");
  const [atualizar, def_atualizar] = useState(false);

  useEffect(() => {
    let tmps = [];

    const atualizar_carregamento = () => {
      tmps.push(setTimeout(() => { def_animacao("animacao-normal"); def_texto_carregamento("📡 Tentando me conectar 📡 "); def_atualizar(true); }, 4000));
      tmps.push(setTimeout(() => { def_texto_carregamento("🛰️ Vou tentar novamente 🛰️"); }, 8000));
      tmps.push(setTimeout(() => { def_texto_carregamento("🚧 Em manutenção! 🚧"); def_animacao("animacao-caindo"); }, 12000));
    };

    if (carregando) {
      atualizar_carregamento();
    }else{
      if(atualizar){ def_atualizar(false); window.location.href = "/";}
    }

    return () => {
      tmps.forEach(tmp => clearTimeout(tmp));
    };
  }, [carregando]);

  useEffect(() => {
    const loadApis = async () => {
      if (apis.length === 0 && populares.length === 0) {
        const apisPopulares = await buscarAPIs(0, 5, "clickCount", "desc");
        const apisTotais = await buscarAPIs(0, 20, "name", "asc");
        def_apis(apisTotais);
        def_populares(apisPopulares);
        def_populares_tmp(apisPopulares);
        def_filtros(apisTotais);
        def_carregando(apisPopulares.length === 0 && apisTotais.length === 0);
        def_pri_tentativa(false);
      }
    };
    if (primeira_tentativa) {
      loadApis();
    } else {
      const timeoutId = setTimeout(() => {
        if (apis.length === 0 && populares.length === 0) {
          loadApis();
        }
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [apis, populares]);

  useEffect(() => {
    if (populares.length > 0 && apis.length > 0) {
      def_carregando(false);
    }
  }, [populares, apis]);

  const handleSearchChange = (value) => {
    if (value.length > 0) {
      def_populares([]);
    } else {
      def_populares(populares_tmp);
    }
    const filteredApisBusca = apis.filter(
      (api) =>
        api.nome.toLowerCase().includes(value.toLowerCase()) ||
        api.descricao.toLowerCase().includes(value.toLowerCase())
    );
    def_filtros(filteredApisBusca);
  };

  const alterarCategoria = (value) => {
    if (value === "NENHUMA") {
      def_populares(populares_tmp);
      def_filtros(apis);
    } else {
      def_populares([]);
      const filtrarApisCategoria = apis.filter(
        (api) => api.categoria.toLowerCase().includes(value.toLowerCase())
      );
      def_filtros(filtrarApisCategoria);
    }
  };

  return (
    <TemasContexto>
         {carregando ? (
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
      ) : (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Cabecalho />
      {/* <Header buscar={handleSearchChange} trocarCategoria={alterarCategoria} /> */}
          {local.pathname === "/" ? (
      <Corpo populares={populares} apis={apis}/>
          ) : (
            <Outlet />
          )}
        </div>
      )}
    </TemasContexto>
  );
};

export default ComCabecalho;