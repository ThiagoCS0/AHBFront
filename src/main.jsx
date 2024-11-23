import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ComCabecalho from './Componentes/Principais/Camadas/ComCabecalho';
import SemCabecalho from './Componentes/Principais/Camadas/SemCabecalho';
import './Componentes/Principais/Temas/Tema.css';
import Acesso from './Componentes/Corpo/Acesso/Acesso';

const rotas = createBrowserRouter(
  [
    {
      path: "/",
      element: <ComCabecalho />,
      children: [
      ],
    },
    {
      path: "/",
      element: <SemCabecalho />,
      children: [
        { path: "/Acesso", element: <Acesso /> },
      ],
    },
  ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={rotas} />
  </React.StrictMode>
);
