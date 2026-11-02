import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the build works on GitHub Pages subpaths and Netlify alike.
  base: './',
  plugins: [react()],
})
