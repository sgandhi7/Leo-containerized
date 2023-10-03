import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // https://main.vitejs.dev/config/#using-environment-variables-in-config
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tsconfigPaths(), eslint(), EnvironmentPlugin('all')],
    server: {
      open: true,
      port: 8080,
      proxy: {
        '/api': {
          target: env.TXTAI_API_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
