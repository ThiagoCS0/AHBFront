import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ComCabecalho from './Componentes/Principais/Camadas/ComCabecalho';
import SemCabecalho from './Componentes/Principais/Camadas/SemCabecalho';
import './Componentes/Principais/Temas/Tema.css';
import Acesso from './Componentes/Acesso/Acesso';
import Gerenciar from './Componentes/Corpo/Gerenciar/Gerenciar';
import PaginaErros from './Componentes/Principais/Erros/PaginaErros';

const rotas = createBrowserRouter([
  {
    path: '/AHBFront',
    element: <ComCabecalho />,
    errorElement: <PaginaErros />,
    children: [
      { path: "/Gerenciar", element: <Gerenciar /> },
    ],
  },
  {
    path: '/Acesso',
    element: <SemCabecalho />,
    children: [
      { path: "", element: <Acesso /> },
    ],
  },
  {
    path: '*',
    element: <PaginaErros />, // Componente para erros 404
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={rotas} />
  </React.StrictMode>
);
