import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import php from 'vite-plugin-php'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()]
})
