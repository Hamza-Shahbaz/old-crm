// import { defineConfig } from 'vite'
// import path from 'path'
// import sass from 'vite-plugin-sass'

// export default defineConfig({
//   plugins: [
//     sass(),
//   ],
//   css: {
//     modules: true,
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@import "~bootstrap/scss/bootstrap";`,
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})