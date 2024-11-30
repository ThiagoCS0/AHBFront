import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ComCabecalho from './Componentes/Principais/Camadas/ComCabecalho';
import SemCabecalho from './Componentes/Principais/Camadas/SemCabecalho';
import './Componentes/Principais/Temas/Tema.css';
import Acesso from './Componentes/Acesso/Acesso';
import Gerenciar from './Componentes/Corpo/Gerenciar/Gerenciar';
import PaginaErros from './Componentes/Principais/Erros/PaginaErros';

const inicio = import.meta.env.VITE_INICIAL;

const rotas = createBrowserRouter(
  [
    {
      path: inicio,
      element: <ComCabecalho />,
      children: [
        { path: "Gerenciar", element: <Gerenciar /> },
        { path: "/AHBFront/Gerenciar", element: <Gerenciar /> },
      ],
    },
    {
      path: inicio,
      element: <SemCabecalho />,
      children: [
        { path: "Acesso", element: <Acesso /> },
      ],
    },
    {
      path: "*",
      element: <PaginaErros />,
    },
  ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={rotas} />
  </React.StrictMode>
);
