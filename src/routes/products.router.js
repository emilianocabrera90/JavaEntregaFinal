const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

// Listar productos con filtros, paginación y orden
router.get('/', productsController.getAll);

// Obtener producto por ID
router.get('/:pid', productsController.getById);

// Crear producto
router.post('/', productsController.create);

// Actualizar producto
router.put('/:pid', productsController.update);

// Eliminar producto
router.delete('/:pid', productsController.remove);

module.exports = router;


