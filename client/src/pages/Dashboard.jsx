import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute metrics
  const totalBooks = books.length;
  const totalCopies = books.reduce((sum, b) => sum + (Number(b.quantity) || 0), 0);
  const categoriesCount = new Set(books.map((b) => b.category)).size;
  const recentBooks = books.slice(0, 5);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="container">
      <div className="header-row">
        <div>
          <h2>Library Dashboard</h2>
          <p className="subtitle">Overview of your library collection</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/add" className="btn btn-primary">+ Add New Book</Link>
          <Link to="/books" className="btn btn-secondary">View All Books</Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-details">
            <span className="stat-number">{totalBooks}</span>
            <span className="stat-title">Total Book Titles</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-details">
            <span className="stat-number">{totalCopies}</span>
            <span className="stat-title">Total Copies in Stock</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <div className="stat-details">
            <span className="stat-number">{categoriesCount}</span>
            <span className="stat-title">Categories</span>
          </div>
        </div>
      </div>

      {/* Recent Books Preview */}
      <div style={{ marginTop: '2rem' }}>
        <div className="header-row" style={{ marginBottom: '1rem' }}>
          <h3>Recently Added Books</h3>
          <Link to="/books" className="view-all-link">See all →</Link>
        </div>

        {recentBooks.length === 0 ? (
          <p className="no-data">No books added yet. Click "+ Add New Book" to start your catalog.</p>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {recentBooks.map((book) => (
                <tr key={book._id}>
                  <td><strong>{book.title}</strong></td>
                  <td>{book.author}</td>
                  <td><code>{book.isbn}</code></td>
                  <td><span className="category-tag">{book.category}</span></td>
                  <td>{book.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
