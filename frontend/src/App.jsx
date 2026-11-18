
import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: 1,
  });

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get all books
  async function loadBooks() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/books");

      setBooks(response.data);
    } catch (err) {
      console.error("API Error:", err);
      console.log("API URL:", api.defaults.baseURL);

      setError(
        err.response
          ? `Server Error: ${err.response.status} - ${
              err.response.data?.message || "Request failed"
            }`
          : "Cannot connect to backend. Check Render server."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  // Handle input
  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  // Add or update book
  async function saveBook(event) {
    event.preventDefault();

    try {
      setError("");

      const payload = {
        ...form,
        quantity: Number(form.quantity),
      };

      if (editingId) {
        await api.put(`/books/${editingId}`, payload);
      } else {
        await api.post("/books", payload);
      }

      setForm({
        title: "",
        author: "",
        isbn: "",
        quantity: 1,
      });

      setEditingId(null);

      await loadBooks();
    } catch (err) {
      console.error("Save Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save book. Check backend."
      );
    }
  }

  // Edit book
  function editBook(book) {
    setForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn || "",
      quantity: book.quantity ?? 1,
    });

    setEditingId(book._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Delete book
  async function deleteBook(id) {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      setError("");

      await api.delete(`/books/${id}`);

      await loadBooks();
    } catch (err) {
      console.error("Delete Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to delete book."
      );
    }
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null);

    setForm({
      title: "",
      author: "",
      isbn: "",
      quantity: 1,
    });
  }

  return (
    <main className="container">

      <header>
        <div className="mark">📚</div>
        <div>
          <h1>Library Management</h1>
          <p>Manage your books in one place</p>
        </div>
      </header>

      <section className="panel">
        <h2>
          {editingId ? "Update Book" : "Add New Book"}
        </h2>

        <form onSubmit={saveBook}>

          <label>
            Book Title
            <input
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder="Enter book title"
              required
            />
          </label>

          <label>
            Author
            <input
              name="author"
              value={form.author}
              onChange={updateField}
              placeholder="Enter author name"
              required
            />
          </label>

          <div className="form-row">

            <label>
              ISBN
              <input
                name="isbn"
                value={form.isbn}
                onChange={updateField}
                placeholder="Enter ISBN"
              />
            </label>

            <label>
              Quantity
              <input
                name="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={updateField}
                required
              />
            </label>

          </div>

          <div className="actions">

            <button type="submit">
              {editingId ? "Update Book" : "Add Book"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}

          </div>
        </form>
      </section>

      {error && (
        <div className="error">
          {error}
          <button
            className="small secondary"
            onClick={loadBooks}
          >
            Retry
          </button>
        </div>
      )}

      <section className="panel">

        <div className="list-heading">
          <h2>Book Collection</h2>
          <span>{books.length} Book(s)</span>
        </div>

        {loading ? (
          <p>Loading books...</p>
        ) : books.length === 0 ? (
          <p className="empty">
            No books found. Add your first book!
          </p>
        ) : (

          <div className="table-wrap">

            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>

                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn || "—"}</td>
                    <td>{book.quantity}</td>

                    <td className="row-actions">

                      <button
                        className="small secondary"
                        onClick={() => editBook(book)}
                      >
                        Edit
                      </button>

                      <button
                        className="small danger"
                        onClick={() => deleteBook(book._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

      </section>

      <footer>
        Library Management System | MERN Stack
      </footer>

    </main>
  );
}
