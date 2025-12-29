/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@pages': path.resolve(__dirname, '/src/pages'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@assets': path.resolve(__dirname, '/src/assets'),
      '@css': path.resolve(__dirname, '/src/assets/css'),
      '@apiClient': path.resolve(__dirname, '/src/apiClient'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
