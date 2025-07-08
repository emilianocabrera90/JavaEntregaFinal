
const fs = require('fs').promises;
const path = require('path');
const generateId = require('../utils/idGenerator');

const DATA_PATH = path.join(__dirname, '../data/carts.json');

class CartManager {
  async _readFile() {
    try {
      const data = await fs.readFile(DATA_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(DATA_PATH, '[]');
        return [];
      }
      throw err;
    }
  }

  async _writeFile(carts) {
    await fs.writeFile(DATA_PATH, JSON.stringify(carts, null, 2));
  }

  async createCart() {
    const carts = await this._readFile();
    const newCart = {
      id: generateId(),
      products: []
    };
    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this._readFile();
    return carts.find(c => c.id === id);
  }

  async addProductToCart(cid, pid) {
    const carts = await this._readFile();
    const cartIndex = carts.findIndex(c => c.id === cid);
    if (cartIndex === -1) return null;

    const cart = carts[cartIndex];

    const productInCart = cart.products.find(p => p.product === pid);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    carts[cartIndex] = cart;
    await this._writeFile(carts);
    return cart;
  }
}

module.exports = new CartManager();
