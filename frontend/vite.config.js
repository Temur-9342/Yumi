// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // куда проксировать
        changeOrigin: true,
        secure: false,
      }
    }
  }
}
