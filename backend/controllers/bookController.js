const mongoose = require("mongoose");
const Book = require("../models/Book");

exports.getBooks = async (_req, res, next) => {
  try { res.json(await Book.find().sort({ createdAt: -1 })); } catch (err) { next(err); }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, author, isbn, quantity } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and author are required." });
    const book = await Book.create({ title, author, isbn, quantity });
    res.status(201).json(book);
  } catch (err) { next(err); }
};

exports.updateBook = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid book ID." });
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: "Book not found." });
    res.json(book);
  } catch (err) { next(err); }
};

exports.deleteBook = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid book ID." });
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });
    res.json({ message: "Book deleted successfully." });
  } catch (err) { next(err); }
};
