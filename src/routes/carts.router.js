
const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');


router.post('/', cartsController.create);

router.get('/:cid', cartsController.getById);


router.post('/:cid/product/:pid', cartsController.addProduct);

module.exports = router;

