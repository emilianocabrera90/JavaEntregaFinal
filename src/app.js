// ─────────────────────────────────────────────────────────────
// src/app.js
// Configura la app de Express con middlewares y rutas
// ─────────────────────────────────────────────────────────────

const express = require('express');
const app = express();

// Importamos los routers
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

// ───────── Middlewares globales ─────────
app.use(express.json());                    // parsea JSON en el body
app.use(express.urlencoded({ extended: true })); // parsea formularios (por si acaso)

// ───────── Rutas base ─────────
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// ───────── Ruta base simple para testear ─────────
app.get('/', (req, res) => {
  res.send('🛒 API E‑commerce en funcionamiento');
});

// ───────── Middleware de error global (si lo necesitás más adelante) ─────────
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: 'Error interno del servidor' });
// });

module.exports = app;
