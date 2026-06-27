import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// 部署在 Vercel（根網域），所以 base 用 '/'。
export default defineConfig({
  base: '/',
  plugins: [react()],
});
