const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: Number,
  category: String,
  thumbnails: [String],
  status: { type: Boolean, default: true }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);




