import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { rollupOptions: { input: {
    index: fileURLToPath(new URL('./index.html', import.meta.url)),
    blefaroplastia: fileURLToPath(new URL('./blefaroplastia/index.html', import.meta.url)),
  } } },
})
