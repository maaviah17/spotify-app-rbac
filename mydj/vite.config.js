import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3004', // 👈 point this to your backend port
        changeOrigin: true,
      },
    },
  },
})
