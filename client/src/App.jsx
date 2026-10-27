import React from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Top Header Navigation */}
      <header className="navbar">
        <div className="navbar-content">
          <Link to="/" className="brand-title">
            📚 <span>BookNest</span>
          </Link>
          <nav className="nav-menu">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Manage Books
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              + Add Book
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main View Area */}
      <main className="main-viewport">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} BookNest Library Management System • Built with MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;
