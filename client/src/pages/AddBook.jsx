import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    quantity: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.title || !book.author || !book.isbn || !book.category || !book.quantity) {
      alert('Please fill out all fields');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post('http://localhost:5000/api/books', {
        ...book,
        quantity: Number(book.quantity),
      });
      alert('Book added successfully!');
      navigate('/books');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book: ' + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container form-container">
      <div className="header-row">
        <div>
          <h2>Add New Book</h2>
          <p className="subtitle">Enter the details of the book to add it to the library</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label>Book Title *</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Clean Code"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Author *</label>
          <input
            type="text"
            name="author"
            placeholder="e.g. Robert C. Martin"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>ISBN Number *</label>
          <input
            type="text"
            name="isbn"
            placeholder="e.g. 978-0132350884"
            value={book.isbn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <input
            type="text"
            name="category"
            placeholder="e.g. Computer Science, Fiction, Mathematics"
            value={book.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Total Quantity *</label>
          <input
            type="number"
            name="quantity"
            min="1"
            placeholder="e.g. 5"
            value={book.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Book'}
          </button>
          <Link to="/books" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
