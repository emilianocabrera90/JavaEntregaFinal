const Cart = require('../models/cart.model');

class CartManager {
  async createCart() {
    const newCart = new Cart({ products: [] });
    return await newCart.save();
  }

  async getCartById(id) {
    return await Cart.findById(id).populate('products.product').lean();
  }

  async addProductToCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const prodIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (prodIndex !== -1) {
      cart.products[prodIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    return cart.toObject();
  }

  async removeProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart.toObject();
  }

  async updateProducts(cid, products) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = products.map(p => ({
      product: p.product,
      quantity: p.quantity
    }));

    await cart.save();
    return cart.toObject();
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const prod = cart.products.find(p => p.product.toString() === pid);
    if (!prod) return null;

    prod.quantity = quantity;
    await cart.save();
    return cart.toObject();
  }

  async clearCart(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = [];
    await cart.save();
    return cart.toObject();
  }
}

module.exports = new CartManager();

