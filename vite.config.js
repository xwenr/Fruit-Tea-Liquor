import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Default base is '/' for local dev. When embedding the built output under
// another site (e.g. velorah at /drink/), run:
//   npm run build:embed
// which injects `--base=/drink/` via the Vite CLI.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        showcase: resolve(__dirname, 'showcase.html'),
      },
    },
  },
})
