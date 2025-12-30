import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2018',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom') || id.includes('react')) return 'react'
          if (id.includes('socket.io-client')) return 'socket'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('@radix-ui')) return 'radix'
          if (id.includes('react-markdown') || id.includes('shiki')) return 'markdown'
          return 'vendor'
        },
      },
    },
  },
})
