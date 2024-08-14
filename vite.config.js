import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // viteStaticCopy({
    //   targets: [
    //     { src: 'src/assets/*', dest: 'images' }
    //   ]
    // })
  ],
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
    copyPublicDir: true,
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
