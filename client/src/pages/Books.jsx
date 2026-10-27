import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all books from backend
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Failed to load books from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete a book by ID
  const handleDelete = async (id, title) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        alert('Book deleted successfully');
        // Update local state without needing full reload
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book');
      }
    }
  };

  // Filter books locally by search term (Title, Author, or ISBN)
  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container">
      <div className="header-row">
        <div>
          <h2>Manage Books</h2>
          <p className="subtitle">View, search, edit, or delete books in your library</p>
        </div>
        <Link to="/add" className="btn btn-primary">+ Add New Book</Link>
      </div>

      {/* Search Input Bar */}
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by Title, Author, ISBN, or Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="btn btn-clear" onClick={() => setSearch('')}>
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading library catalog...</div>
      ) : filteredBooks.length === 0 ? (
        <div className="no-data">
          <p>{search ? 'No books matching your search query.' : 'No books found in the library.'}</p>
          <Link to="/add" className="btn btn-primary" style={{ marginTop: '0.75rem' }}>
            Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Quantity</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td><strong>{book.title}</strong></td>
                  <td>{book.author}</td>
                  <td><code>{book.isbn}</code></td>
                  <td><span className="category-tag">{book.category}</span></td>
                  <td>{book.quantity}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <Link to={`/edit/${book._id}`} className="btn btn-edit">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id, book.title)}
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Books;
