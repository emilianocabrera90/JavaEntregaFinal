const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

exports.home = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.render('home', { products });
  } catch (error) {
    res.status(500).send('Error al obtener productos');
  }
};

exports.productsList = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
      if (query === 'available') filter.status = true;
      else filter.category = query;
    }

    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOption,
      lean: true
    };

    const result = await Product.paginate(filter, options);

    res.render('products', {
      products: result.docs,
      pagination: {
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        totalPages: result.totalPages,
        prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null
      }
    });
  } catch (error) {
    res.status(500).send('Error al obtener productos');
  }
};

exports.productDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) return res.status(404).send('Producto no encontrado');
    res.render('productDetail', product);  
  } catch (error) {
    res.status(500).send('Error al obtener producto');
  }
};

exports.cartDetail = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product').lean();
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).send('Error al obtener carrito');
  }
};


