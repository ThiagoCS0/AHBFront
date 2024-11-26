import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/AHBFront/"
  // server: {
  //   port: 5173,
  //   open: true,
  // },
})