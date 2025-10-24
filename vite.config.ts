import path from 'node:path'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    // Client build configuration
    return {
      publicDir: 'public',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        }
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          input: './src/client/main.tsx',
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/[name]-[hash].js',
            assetFileNames: 'static/[name][extname]',
            format: 'es'
          }
        }
      }
    }
  } else {
    // Server build configuration (SSR) or development server
    return {
      publicDir: 'public',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        }
      },
      plugins: [
        devServer({
          entry: 'src/index.tsx'
        })
      ],
      build: {
        ssr: true,
        outDir: 'dist',
        emptyOutDir: false,
        rollupOptions: {
          input: './src/index.tsx',
          output: {
            format: 'es',
            entryFileNames: 'index.js'
          }
        }
      },
      ssr: {
        external: ['react', 'react-dom'],
        noExternal: ['hono']
      }
    }
  }
})
