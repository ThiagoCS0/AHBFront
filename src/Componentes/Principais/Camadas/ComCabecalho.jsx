import React, { useEffect, useState } from "react";
import { buscar_apis, traduzir_dados } from "../Servicos/APIs/APIs";
import { TemasContexto } from "../Temas/TemasContexto";
import ListaAPIs from "../../Corpo/Lista_APIs/ListaAPIs";
import PaginaAPI from "../../Corpo/API/Pagina/PaginaAPI";
import Populares from "../../Corpo/Populares/Populares";
import Cabecalho from "../../Cabecalho/Cabecalho";
import Gerenciar from "../Gerenciar/Gerenciar";
import Rodape from "../../Rodape/Rodape";
import Corpo from "../../Corpo/Corpo";

const site = import.meta.env.VITE_INICIAL;

export default function ComCabecalho() {

  const BKEND_TEMP = [
    {
      "id": 9,
      "nome": "APIBrasil",
      "descricao": "Fornece diversas informações sobre o Brasil, como estados, municípios, CEPs, feriados, CNPJ e mais.",
      "metodos": {
        "get": {
          "url": "https://brasilapi.com.br/api/banks/v1",
          "header": "",
          "body": "",
          "token": false
        }
      },
      "link": "https://brasilapi.com.br",
      "categoria": "CEP",
      "imagem": "https://brasilapi.com.br/_next/image?url=%2Fimages%2Fapi-schema.svg&w=384&q=75",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 1,
      "nome": "AwesomeAPI (Consulta de CNPJ, CEP e IP)",
      "descricao": "API para consultar informações como CNPJ, CEP, e IP de maneira gratuita.",
      "metodos": {
        "get": {
          "url": " https://cep.awesomeapi.com.br/json/{CEP}",
          "header": "",
          "body": "",
          "token": false
        }
      },
      "link": "https://docs.awesomeapi.com.br",
      "categoria": "OUTROS",
      "imagem": "https://i.imgur.com/fUDtrN6.png",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 2,
      "nome": "VIACEP",
      "descricao": "API gratuita para consulta de CEPs no Brasil.",
      "metodos": {
        "get": {
          "url": "viacep.com.br/ws/{CEP/json/",
          "header": "",
          "body": "",
          "token": false
        }
      },
      "link": "https://viacep.com.br",
      "categoria": "CEP",
      "imagem": "https://blog.artneo.com.br/wp-content/uploads/2019/01/viacep-webservice.jpg",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 3,
      "nome": "HG Brasil",
      "descricao": "Oferece APIs para consultas sobre clima, dólar, notícias, e mais.",
      "metodos": {
        "get": {
          "url": "https://api.hgbrasil.com/weather?key={SUA_CHAVE}",
          "header": "",
          "body": "",
          "token": true
        }
      },
      "link": "https://hgbrasil.com",
      "categoria": "CLIMA",
      "imagem": "https://hgbrasil.eng.br/wp-content/uploads/2023/12/hgbrasil-logo.png",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 4,
      "nome": "IBGE APIs",
      "descricao": "Dados estatísticos e informações do Instituto Brasileiro de Geografia e Estatística (IBGE) em vários temas.",
      "metodos": {
        "get": {
          "url": "https://servicodados.ibge.gov.br/api/v2/censos/nomes/{SEU_NOME}",
          "header": "",
          "body": "",
          "token": false
        }
      },
      "link": "https://servicodados.ibge.gov.br/api/docs",
      "categoria": "ESTATISTICAS",
      "imagem": "https://www.ibge.gov.br/templates/novo_portal_base/imagens/logo_mobile.png",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 5,
      "nome": "COVID19-Brasil API",
      "descricao": "API de dados sobre a pandemia de COVID-19 no Brasil.",
      "metodos": {
        "get": {
          "url": "https://covid19-brazil-api.now.sh/api/report/v1",
          "header": "",
          "body": "",
          "token": false
        }
      },
      "link": "https://covid19-brazil-api-docs.vercel.app",
      "categoria": "SAUDE",
      "imagem": "https://i.imgur.com/5FCacIp.jpeg",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 6,
      "nome": "Climatempo API",
      "descricao": "Fornece previsões do tempo e informações meteorológicas detalhadas para o Brasil.",
      "metodos": {
        "get": {
          "url": "http://apiadvisor.climatempo.com.br/api/v1/weather/locale/3477/current?token={SEU_TOKEN}",
          "header": "",
          "body": "",
          "token": true
        }
      },
      "link": "https://advisor.climatempo.com.br/",
      "categoria": "CLIMA",
      "imagem": "https://advisor.climatempo.com.br/landing/img/logo.png",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 7,
      "nome": "Consulta CEP",
      "descricao": "Localiza informações completas de endereço a partir do CEP informado.",
      "metodos": {
        "get": {
          "url": "https://h-apigateway.conectagov.estaleiro.serpro.gov.br/api-cep/v1/consulta/cep/{CEP}",
          "header": "",
          "body": "",
          "token": true
        }
      },
      "link": "https://site.buscarcep.com.br/",
      "categoria": "CEP",
      "imagem": "https://site.buscarcep.com.br/img/logo.png",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 8,
      "nome": "Mercado Pago",
      "descricao": "Permite pagamentos e transações financeiras para e-commerces e aplicativos no Brasil.",
      "metodos": {
        "get": {
          "url": "https://api.mercadopago.com/V1/payments",
          "header": "Authorization: Bearer {SEU_TOKEN}",
          "body": "",
          "token": true
        }
      },
      "link": "https://www.mercadopago.com.br/developers/pt/reference",
      "categoria": "PAGAMENTO",
      "imagem": "svg",
      "cliques": 0,
      "publicador": "Adiministrador"
    }
  ];

  const [apis, def_apis] = useState(BKEND_TEMP);
  const [populares, def_populares] = useState(BKEND_TEMP.slice(0, 5));
  const [filtrado, def_filtrados] = useState(BKEND_TEMP);
  const [filtrando, def_filtrando] = useState(false);
  const [dados_offline, def_dados_offline] = useState(true);
  const [tmp_verificar_servidor, def_tmp_verificar_servidor] = useState(10);
  let atualizar = false;

  useEffect(() => {
    verificar_servidor();
    const intervalo = setInterval(verificar_servidor, tmp_verificar_servidor * 1000);
    return () => clearInterval(intervalo);
  }, []);

  const carregar_dados_offline = () => {
    def_dados_offline(true);
    def_apis(BKEND_TEMP);
    def_populares(BKEND_TEMP.slice(0, 5));
    def_filtrados(BKEND_TEMP);
    atualizar = true;
  }

  const verificar_servidor = async () => {
    try {
      const [lista_populares, lista_apis] = await Promise.all([
        buscar_apis(0, 5, "clickCount", "desc", false),
        buscar_apis(0, 20, "name", "asc", false)
      ]);

      const servidor_online =
        Math.floor(lista_populares.status_get / 100) === 2 &&
        Math.floor(lista_apis.status_get / 100) === 2;

      if (servidor_online) {
        def_dados_offline(false);

        def_apis(traduzir_dados(lista_apis.dados_get));
        def_populares(traduzir_dados(lista_populares.dados_get));
        def_filtrados(traduzir_dados(lista_apis.dados_get));
        def_tmp_verificar_servidor(30);

        if (atualizar) {
          atualizar = false;
          window.location.reload();
        }

      } else {
        def_dados_offline(true);
        def_tmp_verificar_servidor(15);
        carregar_dados_offline();
      }
    } catch (erro) {
      console.log(erro);

      carregar_dados_offline();
    }
  };

  return (
    <TemasContexto>
      <>
        <Cabecalho
          dados_offline={dados_offline}
          buscar={(valor) => {
            const resultado = valor
              ? apis.filter(
                (api) =>
                  api.nome.toLowerCase().includes(valor.toLowerCase()) ||
                  api.descricao.toLowerCase().includes(valor.toLowerCase())
              )
              : apis;

            def_filtrando(!!valor);
            def_filtrados(resultado);
          }}
          categorizar={(categoria) => {
            const resultado =
              categoria === "NENHUMA"
                ? apis
                : apis.filter((api) =>
                  api.categoria.toLowerCase().includes(categoria.toLowerCase())
                );

            def_filtrando(categoria !== "NENHUMA");
            def_filtrados(resultado);
          }}
        />
        <Corpo>
          {sessionStorage.getItem("Paginas") ? (
            <Gerenciar />
          ) : sessionStorage.getItem("API") ? (
            <PaginaAPI dados_offline={dados_offline} dados_apis={apis} />
          ) : (
            <>
              {!filtrando && <Populares dados_offline={dados_offline} populares={populares} />}
              <ListaAPIs dados_offline={dados_offline} apis={filtrado} />
              <Rodape fixar_abaixo={filtrando} />
            </>
          )}
        </Corpo>
      </>
    </TemasContexto>
  );
}