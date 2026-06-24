import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 図つき導出資料（SPA, hash ルーティング）。base は相対にしておくと、build 後の
// dist を任意のサブパス（GitHub Pages の /repo-name/ 等）に置いてもアセットが壊れない。
export default defineConfig({
  plugins: [react()],
  base: './',
})
