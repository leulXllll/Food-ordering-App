const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,  
  },
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
