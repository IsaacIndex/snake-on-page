import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/lib/GameInterface.jsx'),
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        assetFileNames: ({ name }) => {
          if (name.startsWith('src/assets/')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        globals: {
          react: 'React',
        },
      },
    },
  },
  publicDir: 'public'
})
