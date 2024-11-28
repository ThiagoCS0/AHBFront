import { createContext, useState, useEffect } from "react";

export const ContextoTema = createContext();

export const TemasContexto = ({ children }) => {
  const [temas, def_temas] = useState(localStorage.getItem("tema") === "escuro");

  const alterar_tema = () => {
    def_temas(tmp => {
      const novoTema = !tmp;
      localStorage.setItem("tema", novoTema ? "escuro" : "claro");
      return novoTema;
    });
  };

  useEffect(() => {
    document.body.setAttribute("data-tema", temas ? "escuro" : "claro");
  }, [temas]);

  return (
    <ContextoTema.Provider value={{ temas, alterar_tema }}>
        {children}
    </ContextoTema.Provider>
  );
};