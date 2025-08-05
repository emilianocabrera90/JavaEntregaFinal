const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

const io = new Server(server);

// Hacemos io accesible desde app para emitir eventos desde controladores
app.set('io', io);

const productManager = require('./managers/ProductManager');

io.on('connection', (socket) => {
  console.log('🔵 Nuevo cliente conectado, id:', socket.id);

  // Enviar lista completa al cliente que se conecta
  socket.emit('productList', async () => {
    const products = await productManager.getProducts();
    socket.emit('productList', products);
  });

  // También enviamos lista completa a petición del cliente
  socket.on('requestProducts', async () => {
    const products = await productManager.getProducts();
    socket.emit('productList', products);
  });

  // Escuchar evento para agregar producto
  socket.on('addProduct', async (newProductData) => {
    try {
      const newProduct = await productManager.addProduct(newProductData);
      io.emit('productAdded', newProduct);
    } catch (error) {
      socket.emit('errorMessage', error.message);
    }
  });

  // Escuchar evento para eliminar producto
  socket.on('deleteProduct', async (productId) => {
    try {
      const deleted = await productManager.deleteProduct(productId);
      if (deleted) {
        io.emit('productDeleted', productId);
      } else {
        socket.emit('errorMessage', 'Producto no encontrado');
      }
    } catch (error) {
      socket.emit('errorMessage', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado, id:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🛒  E‑commerce API corriendo en http://localhost:${PORT}`);
});

process.on('unhandledRejection', (reason) => {
  console.error('🔴  Unhandled Promise Rejection:', reason);
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
  console.log('\n🛑  Cerrando servidor…');
  server.close(() => {
    console.log('✅  Servidor cerrado correctamente. ¡Hasta luego!');
    process.exit(0);
  });
}

