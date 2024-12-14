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
      "id": 1,
      "nome": "AwesomeAPI (Consulta de CNPJ, CEP e IP)",
      "descricao": "API para consultar informações como CNPJ, CEP, e IP de maneira gratuita.",
      "metodos": {
        "get": [
          {
            "titulo": "Buscar um CEP",
            "url": "https://cep.awesomeapi.com.br/json/{CEP}",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Retorna moedas selecionadas",
            "url": "https://economia.awesomeapi.com.br/json/last/{MOEDA-MOEDA}",
            "header": "",
            "body": "",
            "token": false
          }
        ]
      },
      "link": "https://docs.awesomeapi.com.br",
      "categoria": "OUTROS",
      // "imagem": "https://docs.awesomeapi.com.br/~gitbook/image?url=https%3A%2F%2F343035455-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LDDJfbHDy3v965nUzNO%252Flogo%252FjUplFdH5HnFk16oswjMH%252Fhigh-logo-white-transparent-background.png%3Falt%3Dmedia%26token%3D1569db0a-bc8b-49dc-abca-122974a51bc5&width=192&dpr=1&quality=100&sign=d2d37de6&sv=2",
      "imagem": "awesomeapi",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 2,
      "nome": "VIACEP",
      "descricao": "API gratuita para consulta de CEPs no Brasil.",
      "metodos": {
        "get": [
          {
            "titulo": "Consulta de CEP, com resposta em JSON",
            "url": "viacep.com.br/ws/{CEP}/json/",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Consulta de CEP, com resposta em XML",
            "url": "viacep.com.br/ws/{CEP}/xml/",
            "header": "",
            "body": "",
            "token": false
          }
        ]
      },
      "link": "https://viacep.com.br",
      "categoria": "CEP",
      "imagem": "viacep",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 3,
      "nome": "HG Brasil",
      "descricao": "Oferece APIs para consultas sobre clima, dólar, notícias, e mais.",
      "metodos": {
        "get": [
          {
            "titulo": "Dados da bolsa de valores brasileira B3",
            "url": "https://api.hgbrasil.com/finance",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Dados do pregão atual ou do último pregão",
            "url": "https://api.hgbrasil.com/finance/ibovespa?key={SUA_CHAVE}",
            "header": "",
            "body": "",
            "token": true
          },
          {
            "titulo": "Dados de previsão do tempo e condições climáticas atuais",
            "url": "https://api.hgbrasil.com/weather",
            "header": "",
            "body": "",
            "token": true
          },
          {
            "titulo": "Dados de geolocalização através do IP de seu usuário",
            "url": "https://api.hgbrasil.com/geoip?key={SUA_CHAVE}",
            "header": "",
            "body": "",
            "token": true
          }
        ]
      },
      "link": "https://hgbrasil.com",
      "categoria": "CLIMA",
      "imagem": "hgbrasil",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 4,
      "nome": "IBGE APIs",
      "descricao": "Dados estatísticos e informações do Instituto Brasileiro de Geografia e Estatística (IBGE) em vários temas.",
      "metodos": {
        "get": [
          {
            "titulo": "Ranking dos nomes segundo a frequência",
            "url": "https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Frequência de nascimentos por década para o nome",
            "url": "https://servicodados.ibge.gov.br/api/v2/censos/nomes/{NOME [ex.: Maria]}",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Distritos do Brasil",
            "url": "https://servicodados.ibge.gov.br/api/v1/localidades/distritos",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Unidades da Federação do Brasil",
            "url": "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF [ex.: AL]}",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Distritos do Brasil a partir da UF",
            "url": "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF [ex.: AL]}/distritos",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Indicadores por pesquisa",
            "url": "https://servicodados.ibge.gov.br/api/v1/pesquisas",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Pesquisa por identificador",
            "url": "https://servicodados.ibge.gov.br/api/v1/pesquisas/{ID [ex.: 1]}",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Mapa : Brasil e as respectivas UF",
            "url": "https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?intrarregiao=UF",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Mapa : Brasil e seus respectivos municípios",
            "url": "https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?intrarregiao=municipio",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Lista dos marégrafos pertencentes a RMPG",
            "url": "https://servicodados.ibge.gov.br/api/v1/rmpg/maregrafos",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Previsão de maré",
            "url": "https://servicodados.ibge.gov.br/api/v1/rmpg/previsao/{SIGLA_MAREGRAFO [ex.: EMARC]}?momentoInicial={DATA_AAAA-MM-DD-HH-MI [ex.: 2023-12-01-00-00]}&momentoFinal={DATA_AAAA-MM-DD-HH-MI [ex.: 2023-12-02-00-00]}",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Leituras de meteorologia",
            "url": "https://servicodados.ibge.gov.br/api/v1/rmpg/meteorologia/{SIGLA_MAREGRAFO [ex.: EMARC]}?momentoInicial={DATA_AAAA-MM-DD-HH-MI [ex.: 2023-12-01-00-00]}&momentoFinal={DATA_AAAA-MM-DD-HH-MI [ex.: 2023-12-02-00-00]}",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Lista dos produtos de estatística do IBGE",
            "url": "https://servicodados.ibge.gov.br/api/v1/produtos",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Conjunto de países",
            "url": "https://servicodados.ibge.gov.br/api/v1/localidades/paises",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Listagem dos países e os respectivos perfis",
            "url": "https://servicodados.ibge.gov.br/api/v1/paises/{PAIS [ex.: BR]}",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Pesquisas com metadados associados",
            "url": "https://servicodados.ibge.gov.br/api/v2/metadados/pesquisas",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Calendário das divulgações",
            "url": "https://servicodados.ibge.gov.br/api/v3/calendario",
            "header": "",
            "body": "",
            "token": false
          }
        ]
      },
      "link": "https://servicodados.ibge.gov.br/api/docs",
      "categoria": "ESTATISTICAS",
      "imagem": "ibge",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 5,
      "nome": "COVID19 Brasil API",
      "descricao": "API de dados sobre a pandemia de COVID-19 no Brasil.",
      "metodos": {
        "get": [
          {
            "titulo": "Lista casos por todos estados brasileiros",
            "url": "https://covid19-brazil-api.now.sh/api/report/v1",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Lista casos por estado brasileiro",
            "url": "https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/{UF [ex.: AL]}",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Lista casos no brasil em data específica",
            "url": "https://covid19-brazil-api.now.sh/api/report/v1/brazil/{DATA_AAAAMMDD [ex.: 20200318]}",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Lista casos por países",
            "url": "https://covid19-brazil-api.vercel.app/api/report/v1/countries",
            "header": "",
            "body": "",
            "token": false
          },
          {
            "titulo": "Lista casos por país",
            "url": "https://covid19-brazil-api.now.sh/api/report/v1/{PAIS [ex.: Brazil]}",
            "header": "",
            "body": "",
            "token": false
          }
        ]
      },
      "link": "https://covid19-brazil-api-docs.vercel.app",
      "categoria": "SAUDE",
      "imagem": "covid19",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 6,
      "nome": "Climatempo API",
      "descricao": "Fornece previsões do tempo e informações meteorológicas detalhadas para o Brasil.",
      "metodos": {
        "get": [
          {
            "titulo": "Localidade - Pesquise país por nome",
            "url": "https://apiadvisor.climatempo.com.br/api/v1/locale/city?country=BR&token={TOKEN [ex.: 0000000fc0c00b0f0000db0d0f00000de]}",
            "header": "",
            "body": "",
            "token": true
          },
          {
            "titulo": "Localidade - Pesquise estado por nome",
            "url": "hhttps://apiadvisor.climatempo.com.br/api/v1/locale/city?state={UF [ex.: AL]}&token={TOKEN [ex.: 0000000fc0c00b0f0000db0d0f00000de]}",
            "header": "",
            "body": "",
            "token": true
          },
          {
            "titulo": "Clima atual",
            "url": "https://apiadvisor.climatempo.com.br/api/v1/weather/locale/{ID_CIDADE [ex.: 3477 (São Paulo)]}/current?token={TOKEN [ex.: 0000000fc0c00b0f0000db0d0f00000de]}",
            "header": "",
            "body": "",
            "token": true
          },
          {
            "titulo": "Monitoramento - Monitoramento de Alerta",
            "url": "http://apiadvisor.climatempo.com.br/api/v1/monitoring/alerts?token={TOKEN [ex.: 0000000fc0c00b0f0000db0d0f00000de]}",
            "header": "",
            "body": "",
            "token": true
          }
        ]
      },
      "link": "https://advisor.climatempo.com.br/",
      "categoria": "CLIMA",
      "imagem": "climatempo",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 7,
      "nome": "Buscar CEP",
      "descricao": "Web Service de buscas de Endereços e SMS. Com plano gratuito limitado a 2 buscas por minuto",
      "metodos": {
        "get": [
          {
            "titulo": "Buscar CEP",
            "url": "https://buscarcep.com.br/?cep={CEP [ex.: 57020440 (Maceió)]}&chave=Chave_Gratuita_BuscarCep",
            "header": "",
            "body": "",
            "token": true
          },
          {
            "titulo": "Enviar SMS",
            "url": "https://buscarcep.com.br/ws2/?telefone={TEL [ex. 5500987654321 (Pais+DDD+Numero)]}&texto={TEXTO}&chave={CHAVE [ex.: Chave_Gratuita_BuscarCep]}",
            "header": "",
            "body": "",
            "token": true
          }
        ]
      },
      "link": "https://site.buscarcep.com.br/",
      "categoria": "CEP",
      "imagem": "buscarcep",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 8,
      "nome": "Mercado Pago",
      "descricao": "Permite pagamentos e transações financeiras para e-commerces e aplicativos no Brasil.",
      "metodos": {
        "ver_site": {
          "titulo": "Consulte o site",
          "url": "https://www.mercadopago.com.br/developers/pt/reference",
          "header": "",
          "body": "",
          "token": true
        }
      },
      "link": "https://www.mercadopago.com.br/developers/pt/reference",
      "categoria": "PAGAMENTO",
      "imagem": "mercadopago",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 9,
      "nome": "APIBrasil",
      "descricao": "Fornece diversas informações sobre o Brasil, como estados, municípios, CEPs, feriados, CNPJ e mais.",
      "metodos": {
        "get": [
          {
            "titulo": "Busca por CEP",
            "url": "https://brasilapi.com.br/api/cep/v1/{CEP [ex. 57020440]}",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Informações relacionadas a DDDs",
            "url": "https://brasilapi.com.br/api/cnpj/v1/{CNPJ [ex. 06990590000123]}",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Informações relacionadas a DDDs",
            "url": "https://brasilapi.com.br/api/ddd/v1/{DDD [ex. 82]}",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Feriados nacionais",
            "url": "https://brasilapi.com.br/api/feriados/v1/{ANO [ex. 2025]}",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Preço médio de Carros fornecido pela FIPE",
            "url": "https://brasilapi.com.br/api/fipe/marcas/v1/carros",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Preço médio de Motos fornecido pela FIPE",
            "url": "https://brasilapi.com.br/api/fipe/marcas/v1/motos",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Todos os bancos do Brasil",
            "url": "https://brasilapi.com.br/api/banks/v1",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Avalia um dominio no registro.br",
            "url": "https://brasilapi.com.br/api/registrobr/v1/{DOMINIO}",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Informações referentes ao PIX",
            "url": "https://brasilapi.com.br/api/pix/v1/participants",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Corretoras ativas listadas na CVM",
            "url": "https://brasilapi.com.br/api/cvm/corretoras/v1",
            "header": "",
            "body": "",
            "token": false
          }
        ]
      },
      "link": "https://brasilapi.com.br",
      "categoria": "CEP",
      "imagem": "apibrasil",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 10,
      "nome": "PagSeguro",
      "descricao": "Ferramenta de pagamentos online e de transações financeiras.",
      "metodos": {
        "ver_site": {
          "titulo": "Consulte o site",
          "url": "https://developer.pagbank.com.br/reference/",
          "header": "",
          "body": "",
          "token": true
        }
      },
      "link": "https://developer.pagbank.com.br/",
      "categoria": "PAGAMENTO",
      "imagem": "pagseguro",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 11,
      "nome": "Invertexto.com | API",
      "descricao": "",
      "metodos": {
        "get": [
          {
            "titulo": "Codigo de Barra",
            "url": "https://api.invertexto.com/v1/barcode?token=SEUTOKEN&text=exemplo&type=code39&font=arial",
            "header": "",
            "body": "",
            "token": true
          }, {
            "titulo": "Gerador de Pessoas",
            "url": "https://api.invertexto.com/v1/faker?token=SEUTOKEN&fields=name,cpf&locale=pt_BR",
            "header": "",
            "body": "",
            "token": true
          }, {
            "titulo": "Localizador de IP",
            "url": "https://api.invertexto.com/v1/geoip/200.33.152.248?token=SEUTOKEN",
            "header": "",
            "body": "",
            "token": true
          }, {
            "titulo": "Validador de CPF e CNPJ",
            "url": "https://api.invertexto.com/v1/validator?token=SEUTOKEN&value=11111111111",
            "header": "",
            "body": "",
            "token": true
          }, {
            "titulo": "Conversor de Moedas",
            "url": "https://api.invertexto.com/v1/currency/USD_BRL?token=SEUTOKEN",
            "header": "",
            "body": "",
            "token": true
          }, {
            "titulo": "Validador de Email",
            "url": "https://api.invertexto.com/v1/email-validator/email@example.com?token=SEUTOKEN",
            "header": "",
            "body": "",
            "token": true
          }
        ]
      },
      "link": "https://api.invertexto.com/",
      "categoria": "OUTROS",
      "imagem": "invertexto",
      "cliques": 0,
      "publicador": "Adiministrador"
    },
    {
      "id": 12,
      "nome": "API do Vagalume",
      "descricao": "",
      "metodos": {
        "get": [
          {
            "titulo": "Informações do artistas",
            "url": "https://www.vagalume.com.br/{ARTISTA [ex. sergio-lopes]}/index.js",
            "header": "",
            "body": "",
            "token": false
          }, {
            "titulo": "Informações da musica",
            "url": "https://api.vagalume.com.br/search.php?art={ARTISTA [ex. sergio-lopes]}&mus={NOME_MUSICA [ex. o-amigo]}&apikey={CHAVE_API}",
            "header": "",
            "body": "",
            "token": true
          },
          {
            "titulo": "Imagem do artista",
            "url": "https://api.vagalume.com.br/search.php?art={ARTISTA [ex. sergio-lopes]}&extra=artpic&nolyrics=1&apikey={CHAVE_API}",
            "header": "",
            "body": "",
            "token": true
          }
        ]
      },
      "link": "https://api.vagalume.com.br/docs/",
      "categoria": "",
      "imagem": "vagalume",
      "cliques": 0,
      "publicador": "Adiministrador"
    }
    // ,
    // {
    //   "id": 13,
    //   "nome": "",
    //   "descricao": "",
    //   "metodos": {
    //     "get": [
    //       {
    //         "titulo": "",
    //         "url": "",
    //         "header": "",
    //         "body": "",
    //         "token": false
    //       }, {
    //         "titulo": "",
    //         "url": "",
    //         "header": "",
    //         "body": "",
    //         "token": false
    //       }
    //     ]
    //   },
    //   "link": "",
    //   "categoria": "",
    //   "imagem": "",
    //   "cliques": 0,
    //   "publicador": "Adiministrador"
    // }
  ];

  const [apis, def_apis] = useState(BKEND_TEMP);
  const [populares, def_populares] = useState(BKEND_TEMP.slice(0, 5));
  const [filtrado, def_filtrados] = useState(BKEND_TEMP);
  const [filtrando, def_filtrando] = useState(false);
  const [dados_offline, def_dados_offline] = useState(true);
  const [tmp_verificar_servidor, def_tmp_verificar_servidor] = useState(600);
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
        def_tmp_verificar_servidor(600);

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
      carregar_dados_offline();
    }
  };

  return (
    <TemasContexto>
      <>
        <Cabecalho
          dados_offline={dados_offline}
          buscar={valor => {
            const resultado = valor
              ? apis.filter(
                api =>
                  api.nome.toLowerCase().includes(valor.toLowerCase()) ||
                  api.descricao.toLowerCase().includes(valor.toLowerCase())
              )
              : apis;
            def_filtrando(!!valor);
            def_filtrados(resultado);
          }}
          categorizar={categoria => {
            const resultado =
              categoria === "NENHUMA"
                ? apis
                : apis.filter(api =>
                  api.categoria.toLowerCase().includes(categoria.toLowerCase())
                );
            def_filtrando(categoria !== "NENHUMA");
            def_filtrados(resultado);
          }}
        />
        <Corpo>
          {sessionStorage.getItem("Paginas") ? (
            <Gerenciar dados_offline={dados_offline} />
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