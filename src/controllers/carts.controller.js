const cartManager = require('../managers/CartManager');

exports.create = async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartProducts = async (req, res) => {
  try {
    const updatedCart = await cartManager.updateProducts(req.params.cid, req.body.products);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProductQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ error: 'Cantidad inválida' });
    }

    const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const updatedCart = await cartManager.clearCart(req.params.cid);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const carts = await cartManager.getAll();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carritos' });
  }
};
