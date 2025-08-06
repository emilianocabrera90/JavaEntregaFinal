module.exports = {
  multiply: (a, b) => a * b,

  totalPrice: (products) => {
    if (!Array.isArray(products)) return 0;
    return products.reduce((acc, item) => acc + (item.quantity * (item.product.price || 0)), 0);
  }
};
