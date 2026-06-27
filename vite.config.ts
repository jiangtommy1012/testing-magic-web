import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// GitHub Pages 專案站台路徑是 /<repo>/，所以 base 固定為 /testing-magic-web/。
// 本機開發請開 http://localhost:5173/testing-magic-web/。
export default defineConfig({
  base: '/testing-magic-web/',
  plugins: [react()],
});
