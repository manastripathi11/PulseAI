const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceRequired: { type: String, required: true },
  budget: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', quoteSchema);
