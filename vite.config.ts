import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // https://main.vitejs.dev/config/#using-environment-variables-in-config
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      eslint({
        fix: true,
        include: ['src/**/*.ts', 'src/**/*.tsx'],
      }),
      EnvironmentPlugin('all'),
    ],
    resolve: {
      alias: {
        '~uswds': path.resolve(__dirname, 'node_modules/@uswds/uswds'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['node_modules/@uswds/uswds/packages'],
        },
      },
      postcss: {
        plugins: [autoprefixer],
      },
    },
    server: {
      open: true,
      port: 8080,
      hmr: {
        overlay: false
      },
      proxy: {
        '/api': {
          target: env.AZURE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
