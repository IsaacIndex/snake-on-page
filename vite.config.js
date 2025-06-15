import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
/* eslint-env node */
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig(({ mode }) => {
  if (mode === 'gh') {
    // Export 1: GitHub Pages
    return {
      base: "/snake-on-page/",
      plugins: [react()],
    }
  }

  // Export 2: Library mode
  return {
    server: {
      port: 1111
    },
    plugins: [
      react(),
      libInjectCss(),
    ],
    build: {
      cssCodeSplit: false,
      sourcemap: process.env.NODE_ENV !== 'production',
      copyPublicDir: true,
      lib: {
        entry: resolve(__dirname, 'src/lib/GameInterface.jsx'),
        formats: ['es']
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
          },
        },
      },
    },
    publicDir: 'public'
  }
})
