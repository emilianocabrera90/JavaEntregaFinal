
const express = require('express');
const router = express.Router();

const productManager = require('../managers/ProductManager');


router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
});


router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).send('Error al cargar productos en tiempo real');
  }
});

module.exports = router;
