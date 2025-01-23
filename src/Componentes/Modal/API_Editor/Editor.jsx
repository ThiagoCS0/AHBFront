import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { remover_token, validar_token } from "../../Principais/Servicos/JWT/JWT";
import { meu_post, meu_put } from "../../Principais/Servicos//Backend/Conexao";
import { meus_erros } from "../../Principais/Erros/MeusErros";
import Metodos from "../../Corpo/API/Metodos/Metodos";
import "./Editor.css"

const inicio = import.meta.env.VITE_INICIAL;

export default function Editor({ fechar, cadastrar_minha_api, atualizar_minha_api, api_selec }) {
     const [categoria_api, def_categoria_api] = useState(api_selec ? api_selec.categoria : "");
     const [descricao_api, def_descricao_api] = useState(api_selec ? api_selec.descricao : "");
     const [metodos_api, def_metodos_api] = useState(api_selec ? api_selec.metodos : "");
     const [imagem_api, def_imagem_api] = useState(api_selec ? api_selec.imagem : "");
     const [link_api, def_link_api] = useState(api_selec ? api_selec.link : "");
     const [nome_api, def_nome_api] = useState(api_selec ? api_selec.nome : "");
     const [tipos_metodos, def_tipos_metodos] = useState(false);
     const [resposta_http, def_resposta_http] = useState("");
     const [metodo_atual, def_metodo_atual] = useState("");
     const [api_bk, def_api_bk] = useState(JSON.parse(JSON.stringify(api_selec)));
     const navegar = useNavigate();
     const tela_pequena = window.innerWidth < 600;

     const validar_imagem_api = (valor) => valor.length > 0 && /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?\/.*\.(jpg|jpeg|png|gif)$/i.test(valor);
     const validar_categoria_api = (valor) => valor && valor.length > 0 && valor !== "Escolha uma categoria";
     const validar_link_api = (valor) => /^https?:\/\/([^\/\s]+?\..+|localhost)(:\d+)?(\/.*)?$/i.test(valor);
     const validar_descricao_api = (valor) => valor.length > 3 && valor.length <= 300;
     const validar_nome_api = (valor) => valor.length > 2 && /\S+/.test(valor);

     useEffect(() => {
          def_api_bk(JSON.parse(JSON.stringify(api_selec)));
     }, [])

     useEffect(() => {
          if (resposta_http) {
               const espera = setTimeout(() => { def_resposta_http(''); }, 7000);
               return () => clearTimeout(espera);
          }
     }, [resposta_http]);

     useEffect(() => {
          if (api_selec) {
               def_descricao_api(api_selec.descricao); def_categoria_api(api_selec.categoria);
               def_imagem_api(api_selec.imagem); def_metodos_api(api_selec.metodos);
               def_link_api(api_selec.link); def_nome_api(api_selec.nome);
          }
     }, [api_selec]);

     useEffect(() => {
          const teclas = (e) => { if (e.key === "Escape") { fechar() } };
          window.addEventListener("keydown", teclas);
          return () => { window.removeEventListener("keydown", teclas); };
     }, [fechar]);

     const [erros, def_erros] = useState({
          nomeErros: false, categoriaErros: false, descricaoErros: false,
          metodosErros: false, linkErros: false, imagemErros: false,
     });

     const options = [
          { NENHUMA: "NENHUMA" }, { ARMAZENAMENTO: "ARMAZENAMENTO" },
          { CEP: "CEP" }, { CLIMA: "CLIMA" }, { EMPRESAS: "EMPRESAS" },
          { ENTRETENIMENTO: "ENTRETENIMENTO" }, { ESTATISTICAS: "ESTATÍSTICAS" }, { FINANCAS: "FINANÇAS" },
          { MAPAS: "MAPAS" }, { OUTROS: "OUTROS" }, { PAGAMENTO: "PAGAMENTO" }, { REDE_SOCIAIS: "REDE SOCIAIS" }, { SAUDE: "SAÚDE" }
     ];

     const criar_api = async () => {
          try {
               def_resposta_http('');
               const token = validar_token();
               if (token) {
                    const categoria_corrigida =
                         categoria_api === "REDE SOCIAIS" ? "REDE_SOCIAIS" :
                              categoria_api === "SAÚDE" ? "SAUDE" :
                                   categoria_api === "FINANÇAS" ? "FINANCAS" :
                                        categoria_api === "ESTATÍSTICAS" ? "ESTATISTICAS" :
                                             categoria_api;
                    def_categoria_api(categoria_corrigida)

                    const id_usuario = JSON.parse(atob(token.split('.')[1])).userId;

                    const corpo = {
                         name: nome_api,
                         description: descricao_api,
                         methods: metodos_api,
                         link: link_api,
                         categoria: categoria_corrigida,
                         icon: imagem_api,
                         user: { id: id_usuario }
                    };

                    let status = "", dados = "";

                    const resultado = api_selec
                         ? await meu_put(`apis/${api_selec.id}`, corpo, true)
                         : await meu_post("apis", corpo, true);

                    status = resultado.status_put || resultado.status_post;
                    dados = resultado.dados_post || "";

                    if (Math.floor(status / 100) === 2) {
                         if (api_selec) {
                              atualizar_minha_api({
                                   id: api_selec.id,
                                   nome: nome_api,
                                   descricao: descricao_api,
                                   metodos: metodos_api,
                                   link: link_api,
                                   categoria: categoria_api,
                                   imagem: imagem_api,
                                   publicador: id_usuario
                              });
                         }

                         if (dados) {
                              const id_api = dados.id;
                              cadastrar_minha_api({
                                   id: id_api,
                                   nome: nome_api,
                                   descricao: descricao_api,
                                   metodos: metodos_api,
                                   link: link_api,
                                   categoria: categoria_api,
                                   imagem: imagem_api,
                                   publicador: id_usuario
                              });
                         }
                         redefinir_campos();
                         fechar();
                         return;
                    } else { def_resposta_http(api_selec ? "Erro ao atualizar." : "Erro ao criar API."); }
               } else {
                    novo_acesso();
               }
          } catch (erro) {
               def_resposta_http("Erro de conexão. Tente novamente!");
               meus_erros(import.meta.url.split('/').pop(), `CAT_CRI_API: ${erro}`);
          }
     };

     const novo_acesso = () => {
          sessionStorage.clear();
          remover_token();
          navegar(inicio)
          return;
     }

     const redefinir_campos = () => {
          api_selec.metodos = api_bk.metodos;
          def_descricao_api('');
          def_resposta_http('');
          def_metodos_api('');
          def_imagem_api('');
          def_nome_api('');
          def_link_api('');
     }

     const alterando_nome = (e) => {
          const valor = e.target.value;
          def_erros((tmp) => ({ ...tmp, nomeErros: !validar_nome_api(valor) }));
          def_nome_api(valor);
     };

     const alterando_categoria = (o) => {
          def_erros((tmp) => ({ ...tmp, categoriaErros: !validar_categoria_api(o) }));
          def_categoria_api(o.toUpperCase())
     };

     const alterando_descricao = (e) => {
          const valor = e.target.value;
          def_descricao_api(valor);
          def_erros((tmp) => ({ ...tmp, descricaoErros: !validar_descricao_api(valor) }));
     };

     const alterando_metodos = (e) => {
          const valor = e.target.value;
          def_metodos_api(valor);
          def_erros((tmp) => ({ ...tmp, metodosErros: !validarMetodosApi(valor) }));
     };

     const alterando_link = (e) => {
          const valor = e.target.value;
          def_link_api(valor);
          def_erros((tmp) => ({ ...tmp, linkErros: !validar_link_api(valor) }));
     };

     const alterando_imagem = (e) => {
          const valor = e.target.value;
          def_imagem_api(valor);
          def_erros((tmp) => ({ ...tmp, imagemErros: !validar_imagem_api(valor) }));
     };

     const validarMetodosApi = (valor) => {
          const metodosValidos = ["VER_SITE", "GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS", "HEAD", "TRACE", "CONNECT"];
          const metodos = valor.split(",").map(metodo => metodo.trim().toUpperCase());
          const unicos = new Set(metodos);
          return metodos.every(metodo => metodosValidos.includes(metodo)) && unicos.size === metodos.length;
     };

     const enviar = (e) => {
          e.preventDefault();
          if (Object.values(erros).every((erro) => !erro)) {
               criar_api();
          } else {
               def_resposta_http("Preencha com dados validos.");
          }
     };

     const click_metodos = (e) => {
          e.preventDefault();
          def_metodo_atual(e.target.innerText.toLowerCase());
          def_tipos_metodos(true);
     }

     const salvar_metodos = (e) => {
          if (e) { api_selec.metodos = e; }
          def_tipos_metodos(false)
     }

     return (
          <div id="gerenciar_modal_apis" onClick={fechar}>
               <div className="modal_nova_api ondulacao-2">
                    {tipos_metodos ?
                         <Metodos dados_offline={false} api={{ ...api_selec }} editar={true} metodos_salvos={salvar_metodos} metodo_atual={metodo_atual} />
                         :
                         <form onClick={e => { e.stopPropagation(); }}>
                              {/* Nome da sua API */}
                              <label className="dados_api">
                                   <p>Nome da sua API</p>
                                   <input
                                        className={erros.nomeErros ? "aviso_erro_borda" : ""}
                                        value={nome_api || ""}
                                        onChange={alterando_nome}
                                        placeholder="Nome da API"
                                        required
                                   />
                                   {erros.nomeErros && <span className="aviso_erro">Deve ter mais de 3 caracteres</span>}
                              </label>
                              {/* Categoria */}
                              <div className="dados_api">
                                   <p>Categoria da API</p>
                                   <select onChange={(e) => { alterando_categoria(e.target.value) }} className="expandir" value={categoria_api}>
                                        {options.map((o, i) => {
                                             const chave = Object.keys(o)[0];
                                             return (<option value={chave} key={i}> {o[chave]} </option>);
                                        })}
                                   </select>
                              </div>
                              {/* Descrição */}
                              <label className="dados_api">
                                   <p>Descrição (Max. <i>300</i> caracteres)</p>
                                   <textarea
                                        className={erros.descricaoErros ? "textarea_descricao aviso_erro_borda" : "textarea_descricao"}
                                        value={descricao_api || ""}
                                        onChange={alterando_descricao}
                                        placeholder="Digite a descrição aqui"
                                        maxLength="300"
                                        required
                                   />
                                   {erros.descricaoErros && <span className="aviso_erro">Deve ter mais de 3 caracteres</span>}
                              </label>
                              {/* Métodos */}
                              <label className="dados_api">
                                   <p>Métodos {tela_pequena ? <br /> : ""}(<i>GET</i>, <i>POST</i>, ... separe com virgula)</p>
                                   <div id="editor_metodos">{
                                        metodos_api &&
                                        Object.keys(metodos_api).map(metodo => {
                                             const metodo_formatado = metodo.trim().toUpperCase();
                                             const cores = { VER_SITE: "var(--destaque)", GET: "#0A0", POST: "#808", DELETE: "#A00", PUT: "#AA0", PATCH: "#088", OPTIONS: "#448", HEAD: "#408", TRACE: "#48B", CONNECT: "#222", };
                                             return cores[metodo_formatado] ? (
                                                  <button key={metodo_formatado}
                                                       style={{ backgroundColor: cores[metodo_formatado] }}
                                                       onClick={e => click_metodos(e)}>
                                                       {metodo_formatado === "VER_SITE" ? "CONSULTE" : metodo_formatado}
                                                  </button>
                                             ) : null;
                                        })
                                   }</div>
                                   {/* <input
                                   className={erros.metodosErros ? "aviso_erro_borda" : ""}
                                   value={metodos_api &&  || ""}
                                   onChange={alterando_metodos}
                                   placeholder="Métodos da API"
                                   required
                                   /> */}
                                   {erros.metodosErros && <span className="aviso_erro">{tela_pequena ? "Use: GET, POST, ... 1 de cada" : "Inválidos; use: GET, POST, etc ( 1 de cada )"}</span>}
                              </label>
                              {/* Link */}
                              <label className="dados_api">
                                   <p>Link ( Use / :  https:<i>//</i> )</p>
                                   <input
                                        className={erros.linkErros ? "aviso_erro_borda" : ""}
                                        value={link_api || ""}
                                        onChange={alterando_link}
                                        placeholder="https://sua.api/"
                                        required
                                   />
                                   {erros.linkErros && <span className="aviso_erro">Link inválido</span>}
                              </label>
                              {/* Logo */}
                              <label className="dados_api">
                                   <p>Logo{tela_pequena ? <br /> : ""} ( URL/imagem<i> . jpg jpeg png gif</i> )</p>
                                   <input
                                        className={erros.imagemErros ? "aviso_erro_borda" : ""}
                                        value={imagem_api || ""}
                                        onChange={alterando_imagem}
                                        placeholder="https://sua.api.imagem.jpg"
                                        required
                                   />
                                   {erros.imagemErros && <span className="aviso_erro">URL inválida</span>}
                              </label>
                              <br />
                              {/* Preview */}
                              {imagem_api && <div id="img_prever"> <img src={imagem_api || ""} alt="Imagem da API" /> </div>}
                              {/* Botões */}
                              <div className="botoes_laterais" style={{ marginTop: "10px" }}>
                                   <button type="button" onClick={() => { redefinir_campos(); fechar() }}> Cancelar </button>
                                   <button type="button" onClick={enviar}> {api_selec ? "Atualizar" : "Salvar"} </button>
                              </div>
                              {resposta_http && <p className="texto_erro"> {resposta_http} </p>}
                         </form>}
               </div>
          </div>
     );
}
