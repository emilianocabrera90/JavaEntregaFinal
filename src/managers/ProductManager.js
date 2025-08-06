const Product = require('../models/product.model');

class ProductManager {
  async getProducts(filter = {}, options = {}) {
    return await Product.paginate(filter, options);
  }

  async getProductById(id) {
    return await Product.findById(id).lean();
  }

  async addProduct(productData) {
    
    const exists = await Product.findOne({ code: productData.code });
    if (exists) {
      throw new Error('El código ya existe');
    }

    const newProduct = new Product(productData);
    return await newProduct.save();
  }

  async updateProduct(id, updates) {
    return await Product.findByIdAndUpdate(id, updates, { new: true }).lean();
  }

  async deleteProduct(id) {
    const result = await Product.findByIdAndDelete(id);
    return result !== null;
  }
}

module.exports = new ProductManager();


