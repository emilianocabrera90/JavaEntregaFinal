const http = require('http');     
const app = require('./app');     

const PORT = process.env.PORT || 8080;


const server = http.createServer(app);


server.listen(PORT, () => {
  console.log(`🛒  E‑commerce API corriendo en http://localhost:${PORT}`);
});


process.on('unhandledRejection', (reason) => {
  console.error('🔴  Unhandled Promise Rejection:', reason);
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown () {
  console.log('\n🛑  Cerrando servidor…');
  server.close(() => {
    console.log('✅  Servidor cerrado correctamente. ¡Hasta luego!');
    process.exit(0);
  });
}
