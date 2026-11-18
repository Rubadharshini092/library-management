const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, trim: true, default: "" },
  quantity: { type: Number, min: 0, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
