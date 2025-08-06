// carts.router.js (completo con nuevo endpoint)
const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller'); // asumiendo que usás este controller

// Nuevo endpoint para listar todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await cartsController.getAll(); // lo definimos en el controller
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carritos' });
  }
});

// Crear carrito
router.post('/', cartsController.create);

// Obtener productos del carrito con populate
router.get('/:cid', cartsController.getById);

// Agregar producto al carrito
router.post('/:cid/product/:pid', cartsController.addProduct);

// Eliminar producto específico del carrito
router.delete('/:cid/products/:pid', cartsController.removeProduct);

// Actualizar todos los productos del carrito (recibe array)
router.put('/:cid', cartsController.updateCartProducts);

// Actualizar solo cantidad de un producto en carrito
router.put('/:cid/products/:pid', cartsController.updateProductQuantity);

// Vaciar carrito (eliminar todos productos)
router.delete('/:cid', cartsController.clearCart);

module.exports = router;





