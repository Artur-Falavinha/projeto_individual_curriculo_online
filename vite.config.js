import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const nomeRepositorio = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePublica = process.env.GITHUB_ACTIONS && nomeRepositorio ? `/${nomeRepositorio}/` : '/';

export default defineConfig({
  plugins: [react()],
  base: basePublica,
});
