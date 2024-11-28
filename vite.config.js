import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/AHBFront/"
  // routes: [
  //   { name: 'criar', path: '/criar', component: () => import('./src/Componentes/Acesso/Criar/Criar'), },
  //   { name: 'recuperar', path: '/recuperar', component: () => import('./src/Componentes/Acesso/Recuperar/Recuperar'), },
  //   {
  //     name: 'acesso', path: '/', children: [
  //       { name: 'criar', path: 'criar', component: () => import('./src/Componentes/Acesso/Criar/Criar'), },
  //       { name: 'recuperar', path: 'recuperar', component: () => import('./src/Componentes/Acesso/Recuperar/Recuperar'), },
  //     ],
  //   }],
  server: {
    port: 5173,
    open: true,
  },
})
