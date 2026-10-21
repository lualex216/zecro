import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  // Build-ul SSR e doar pentru prerender; nu are nevoie de copia din public/.
  build: { copyPublicDir: !isSsrBuild },
}))
