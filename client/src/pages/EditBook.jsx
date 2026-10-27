import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    quantity: '',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Load existing book data from backend
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook({
          title: res.data.title,
          author: res.data.author,
          isbn: res.data.isbn,
          category: res.data.category,
          quantity: res.data.quantity,
        });
      } catch (error) {
        console.error('Error fetching book details:', error);
        alert('Could not find or load book');
        navigate('/books');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      await axios.put(`http://localhost:5000/api/books/${id}`, {
        ...book,
        quantity: Number(book.quantity),
      });
      alert('Book details updated successfully!');
      navigate('/books');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book: ' + (error.response?.data?.message || error.message));
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading book details...</div>;
  }

  return (
    <div className="container form-container">
      <div className="header-row">
        <div>
          <h2>Edit Book</h2>
          <p className="subtitle">Update the catalog information for this book</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label>Book Title *</label>
          <input
            type="text"
            name="title"
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
            min="0"
            value={book.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary" disabled={updating}>
            {updating ? 'Saving...' : 'Update Book'}
          </button>
          <Link to="/books" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
