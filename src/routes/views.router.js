const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');

router.get('/', (req, res) => {
  res.redirect('/products');
});

router.get('/products', viewsController.productsList);
router.get('/products/:pid', viewsController.productDetail);
router.get('/carts/:cid', viewsController.cartDetail);
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');  
});


module.exports = router;

