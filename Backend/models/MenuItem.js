const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: String,
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, 
    // local image file name e.g pizza.png, 
    required: true,
  },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
