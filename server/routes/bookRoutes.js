import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// 1. READ: Get all books (with optional search query)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});

// 2. READ: Get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
});

// 3. CREATE: Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, isbn, category, quantity } = req.body;

    if (!title || !author || !isbn || !category || quantity === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if ISBN already exists
    const existingBook = await Book.findOne({ isbn: isbn.trim() });
    if (existingBook) {
      return res.status(400).json({ message: `A book with ISBN ${isbn} already exists` });
    }

    const newBook = new Book({
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      category: category.trim(),
      quantity: Number(quantity),
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error saving book', error: error.message });
  }
});

// 4. UPDATE: Edit a book by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, author, isbn, category, quantity } = req.body;

    // Check if new ISBN conflicts with another book
    if (isbn) {
      const existing = await Book.findOne({ isbn: isbn.trim(), _id: { $ne: req.params.id } });
      if (existing) {
        return res.status(400).json({ message: `Another book with ISBN ${isbn} already exists` });
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: title?.trim(),
        author: author?.trim(),
        isbn: isbn?.trim(),
        category: category?.trim(),
        quantity: Number(quantity),
      },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error: error.message });
  }
});

// 5. DELETE: Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
});

export default router;
