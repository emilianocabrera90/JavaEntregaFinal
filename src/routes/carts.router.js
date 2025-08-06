const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');

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




