
const fs = require('fs').promises;
const path = require('path');
const generateId = require('../utils/idGenerator');

const DATA_PATH = path.join(__dirname, '../data/products.json');

class ProductManager {
  
  async _readFile () {
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


  
  async _writeFile (products) {
    await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2));
  }

  
  async getProducts () {
    return this._readFile();
  }

  async getProductById (id) {
    const products = await this._readFile();
    return products.find(p => p.id === id);
  }

  async addProduct (productData) {
    const products = await this._readFile();

    
    if (products.some(p => p.code === productData.code)) {
      throw new Error('El código ya existe');
    }

    const newProduct = {
      id: generateId(),
      status: true,                
      ...productData
    };

    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async updateProduct (id, updates) {
    const products = await this._readFile();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    
    const { id: _ignored, ...rest } = updates;
    products[index] = { ...products[index], ...rest };

    await this._writeFile(products);
    return products[index];
  }

  async deleteProduct (id) {
    const products = await this._readFile();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    await this._writeFile(products);
    return true;
  }
}

module.exports = new ProductManager();
