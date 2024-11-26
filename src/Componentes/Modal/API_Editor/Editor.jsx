import { useEffect, useState } from "react";
import { remover_token, validar_token } from "../../Principais/Servicos/JWT/JWT";
import { useNavigate } from "react-router-dom";
import { meu_post, meu_put } from "../../Principais/Servicos/APIs/Conexao";
import "./Editor.css"
import { MeusErros } from "../../Principais/Erros/MeusErros";

export default function Editor({ exibir_modal, fechar, cadastrar_minha_api, atualizar_minha_api, dados_minha_api }) {
     const [categoria_api, def_categoria_api] = useState(dados_minha_api ? dados_minha_api.categoria : "");
     const [descricao_api, def_descricao_api] = useState(dados_minha_api ? dados_minha_api.descricao : "");
     const [metodos_api, def_metodos_api] = useState(dados_minha_api ? dados_minha_api.metodos : "");
     const [imagem_api, def_imagem_api] = useState(dados_minha_api ? dados_minha_api.imagem : "");
     const [link_api, def_link_api] = useState(dados_minha_api ? dados_minha_api.link : "");
     const [nome_api, def_nome_api] = useState(dados_minha_api ? dados_minha_api.nome : "");
     const [opcao_selecionada, def_opcao_selecionada] = useState("");
     const [select_aberto, def_select_aberto] = useState(false);
     const [resposta_http, def_resposta_http] = useState("");
     const navegar = useNavigate();

     const options = [
          "REDE SOCIAIS", "MAPAS", "CEP", "CLIMA", "PAGAMENTO",
          "ARMAZENAMENTO", "FINANÇAS", "SAÚDE", "ESTATÍSTICAS", "OUTROS", "EMPRESAS"
     ];

     const [erros, def_erros] = useState({
          nomeErros: false,
          categoriaErros: false,
          descricaoErros: false,
          metodosErros: false,
          linkErros: false,
          imagemErros: false,
     });

     const validar_nome_api = (valor) => valor.length > 2 && /\S+/.test(valor);
     const validar_categoria_api = (valor) => valor && valor.length > 0 && valor !== "Escolha uma categoria";
     const validar_descricao_api = (valor) => valor.length > 3 && valor.length <= 300;
     const validar_link_api = (valor) => /^https?:\/\/([^\/\s]+?\..+|localhost)(:\d+)?(\/.*)?$/i.test(valor);

     const validar_imagem_api = (valor) => valor.length > 0 && /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?\/.*\.(jpg|jpeg|png|gif)$/i.test(valor);

     const criar_api = async () => {
          try {
               def_resposta_http('');
               const token = validar_token();
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
                
                const resultado = dados_minha_api 
                    ? await meu_put(`apis/${dados_minha_api.id}`, corpo, true)
                    : await meu_post("apis", corpo, true);
                
                status = resultado.status_put || resultado.status_post;
                dados = resultado.dados_post || "";
               
               if (status === 200) {
                    // fdechar estava aqui
                    if (dados_minha_api) {
                         atualizar_minha_api({
                              id: dados_minha_api.id,
                              nome: nome_api,
                              descricao: descricao_api,
                              metodos: metodos_api,
                              link: link_api,
                              categoria: categoria_api,
                              imagem: imagem_api
                         });
                         fechar();
                         redefinir_campos();
                         return;
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
                              imagem: imagem_api
                         });
                    }
                    redefinir_campos();
               } else { def_resposta_http(dados_minha_api ? "Erro ao atualizar." : "Erro ao criar API."); }
          } catch (erro) {
               def_resposta_http("Erro de conexão. Tente novamente!");
               MeusErros(import.meta.url.split('/').pop(), new Error(`CAT_CRI_API: ${erro}`));
          }
     };




     const novo_acesso = () => {
          sessionStorage.clear();
          remover_token();
          navegar("/AHBFront/")
          return;
     }

     const redefinir_campos = (e) => {
          def_opcao_selecionada('Escolha uma categoria');
          def_descricao_api('');
          def_resposta_http('');
          def_metodos_api('');
          def_imagem_api('');
          def_nome_api('');
          def_link_api('');
     }

     useEffect(() => {
          redefinir_campos();
     }, [exibir_modal])

     useEffect(() => {
          if (resposta_http) {
               const timer = setTimeout(() => { def_resposta_http(''); }, 4000);
               return () => clearTimeout(timer);
          }
     }, [resposta_http]);

     useEffect(() => {
          if (dados_minha_api) {
               def_opcao_selecionada(dados_minha_api.categoria)
               def_descricao_api(dados_minha_api.descricao);
               def_categoria_api(dados_minha_api.categoria);
               def_imagem_api(dados_minha_api.imagem);
               def_metodos_api(dados_minha_api.metodos);
               def_link_api(dados_minha_api.link);
               def_nome_api(dados_minha_api.nome);
          }
     }, [dados_minha_api]);

     const alterando_nome = (e) => {
          const valor = e.target.value;
          def_erros((tmp) => ({ ...tmp, nomeErros: !validar_nome_api(valor) }));
          def_nome_api(valor);
     };

     const alterando_categoria = (option) => {
          def_erros((tmp) => ({ ...tmp, categoriaErros: !validar_categoria_api(option) }));
          def_opcao_selecionada(option.toUpperCase());
          def_categoria_api(option.toUpperCase())
          def_select_aberto(false);
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
          const metodosValidos = ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS", "HEAD", "TRACE", "CONNECT"];
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

     useEffect(() => {
          const teclas = (e) => { if (e.key === "Escape") { fechar(); } };
          window.addEventListener("keydown", teclas);
          return () => { window.removeEventListener("keydown", teclas); };
     }, [fechar]);



     return (
          <div id="gerenciar_modal_apis" style={{ display: exibir_modal ? "flex" : "none" }} onClick={() => { fechar() }}>
               <div className="modal_nova_api ondulacao-2" onClick={e => { e.stopPropagation(); }}>
                    <form>
                         <div div="modal_div_horizontal">
                              {/* Nome da sua API */}
                              <label className="dados_api">
                                   <p>Nome da sua API</p>
                                   <input
                                        className={erros.nomeErros ? "aviso_erro" : ""}
                                        value={nome_api || ""}
                                        onChange={alterando_nome}
                                        placeholder="Nome da API"
                                        required
                                   />
                                   {erros.nomeErros && <span className="aviso_erro">Nome deve ter mais de 3 caracteres</span>}
                              </label>
                              {/* Categoria */}
                              <div className="selecionador_categorias dados_api">
                                   <p>Categoria da API</p>
                                   <div className="selecionador_customizado" onClick={() => def_select_aberto(!select_aberto)}>
                                        <span className={erros.categoriaErros ? "aviso_erro" : ""}>{opcao_selecionada || "Escolha uma categoria"}</span>
                                        <div className={`categoria_seta ${select_aberto ? "aberta" : ""}`}></div>
                                   </div>
                                   {select_aberto && (
                                        <ul lcas>
                                             {options.map((option, index) => (
                                                  <li
                                                       key={index}
                                                       onClick={() => alterando_categoria(option)}
                                                       className="categoria_opcao"
                                                  >
                                                       {option}
                                                  </li>
                                             ))}
                                        </ul>
                                   )}
                              </div>
                         </div>
                         {/* Descrição */}
                         <label className="dados_api">
                              <p>Descrição (Max. <i>300</i> caracteres)</p>
                              <textarea
                                   className={erros.descricaoErros ? "textarea_descricao aviso_erro" : "textarea_descricao"}
                                   value={descricao_api || ""}
                                   onChange={alterando_descricao}
                                   placeholder="Digite a descrição aqui"
                                   maxLength="300"
                                   required
                              />
                              {erros.descricaoErros && <span className="aviso_erro">Descrição deve ter mais de 3 caracteres</span>}
                         </label>
                         {/* Métodos */}
                         <label className="dados_api">
                              <p>Métodos ( <i>GET</i>, <i>POST</i>, ..; separe com virgula )</p>
                              <input
                                   className={erros.metodosErros ? "aviso_erro" : ""}
                                   value={metodos_api || ""}
                                   onChange={alterando_metodos}
                                   placeholder="Métodos da API"
                                   required
                              />
                              {erros.metodosErros && <span className="aviso_erro">Inválidos, use: GET, POST, etc ( 1 de cada )</span>}
                         </label>
                         {/* Link */}
                         <label className="dados_api">
                              <p>Link ( Use / :  https:<i>//</i> )</p>
                              <input
                                   className={erros.linkErros ? "aviso_erro" : ""}
                                   value={link_api || ""}
                                   onChange={alterando_link}
                                   placeholder="https://sua.api/"
                                   required
                              />
                              {erros.linkErros && <span className="aviso_erro">Link inválido ou não encontrado</span>}
                         </label>
                         {/* Logo */}
                         <label className="dados_api">
                              <p>Logo ( URL/imagem<i> . jpg jpeg png gif</i> )</p>
                              <input
                                   className={erros.imagemErros ? "aviso_erro" : ""}
                                   value={imagem_api || ""}
                                   onChange={alterando_imagem}
                                   placeholder="https://sua.api.imagem.jpg"
                                   required
                              />
                              {erros.imagemErros && <span className="aviso_erro">Imagem inválido ou URL não é uma imagem</span>}
                         </label>
                         <br />
                         {/* Preview */}
                         {imagem_api && (
                              <div id="img_prever">
                                   <img
                                        src={imagem_api || ""}
                                        alt="Imagem da API"
                                   />
                              </div>
                         )}
                         {/* Botões */}
                         <div className="campos_laterais" style={{ marginTop: "10px" }}>
                              <button type="button" onClick={() => { redefinir_campos(); fechar() }}>Cancelar</button>
                              <button type="button" onClick={enviar}> {dados_minha_api ? "Atualizar" : "Salvar"} </button>
                         </div>
                         {resposta_http && (<p className="texto_erro"> {resposta_http} </p>)}
                    </form>
               </div>
          </div>
     );
}
