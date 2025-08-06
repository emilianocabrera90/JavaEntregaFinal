const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = new Server(server);

// Conexión a MongoDB sin opciones obsoletas
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    server.listen(PORT, () => {
      console.log(`🛒 E‑commerce API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err);
  });

// Pasamos instancia de Socket.IO a app
app.set('io', io);

// WebSocket: lógica de productos en tiempo real
const productManager = require('./managers/ProductManager');

io.on('connection', async (socket) => {
  console.log('🔵 Nuevo cliente conectado, id:', socket.id);

  // Enviar lista inicial de productos
  const products = await productManager.getProducts();
  socket.emit('productList', products);

  // Reenviar lista completa si lo piden
  socket.on('requestProducts', async () => {
    const products = await productManager.getProducts();
    socket.emit('productList', products);
  });

  // Agregar producto
  socket.on('addProduct', async (newProductData) => {
    try {
      const newProduct = await productManager.addProduct(newProductData);
      io.emit('productAdded', newProduct);
    } catch (error) {
      socket.emit('errorMessage', error.message);
    }
  });

  // Eliminar producto
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

  // Desconexión
  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado, id:', socket.id);
  });
});

// Manejo de cierre
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
