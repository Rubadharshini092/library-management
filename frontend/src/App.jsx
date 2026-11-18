import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", isbn: "", quantity: 1 });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadBooks() {
    try {
      setLoading(true);
      const { data } = await api.get("/books");
      setBooks(data);
      setError("");
    } catch {
      setError("Could not load books. Check that the backend is running and the API URL is correct.");
    } finally { setLoading(false); }
  }

  useEffect(() => { loadBooks(); }, []);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function saveBook(event) {
    event.preventDefault();
    try {
      const payload = { ...form, quantity: Number(form.quantity) };
      if (editingId) await api.put(`/books/${editingId}`, payload);
      else await api.post("/books", payload);
      setForm({ title: "", author: "", isbn: "", quantity: 1 });
      setEditingId(null);
      setError("");
      await loadBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save book.");
    }
  }

  function editBook(book) {
    setForm({ title: book.title, author: book.author, isbn: book.isbn || "", quantity: book.quantity ?? 1 });
    setEditingId(book._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteBook(id) {
    if (!window.confirm("Delete this book?")) return;
    try { await api.delete(`/books/${id}`); await loadBooks(); }
    catch { setError("Unable to delete book."); }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ title: "", author: "", isbn: "", quantity: 1 });
  }

  return <main className="container">
    <header><div className="mark">📚</div><div><h1>Library Management</h1><p>Manage your books in one place</p></div></header>
    <section className="panel">
      <h2>{editingId ? "Update book" : "Add a book"}</h2>
      <form onSubmit={saveBook}>
        <label>Book title<input name="title" value={form.title} onChange={updateField} required placeholder="Enter book title" /></label>
        <label>Author<input name="author" value={form.author} onChange={updateField} required placeholder="Enter author name" /></label>
        <div className="form-row">
          <label>ISBN (optional)<input name="isbn" value={form.isbn} onChange={updateField} placeholder="ISBN" /></label>
          <label>Quantity<input name="quantity" type="number" min="0" value={form.quantity} onChange={updateField} required /></label>
        </div>
        <div className="actions"><button type="submit">{editingId ? "Save changes" : "Add book"}</button>{editingId && <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>}</div>
      </form>
    </section>
    {error && <p className="error">{error}</p>}
    <section className="panel">
      <div className="list-heading"><h2>Book collection</h2><span>{books.length} book(s)</span></div>
      {loading ? <p>Loading books…</p> : books.length === 0 ? <p className="empty">No books yet. Add your first book above.</p> :
        <div className="table-wrap"><table><thead><tr><th>Title</th><th>Author</th><th>ISBN</th><th>Quantity</th><th>Actions</th></tr></thead>
          <tbody>{books.map(book => <tr key={book._id}><td>{book.title}</td><td>{book.author}</td><td>{book.isbn || "—"}</td><td>{book.quantity}</td><td className="row-actions"><button className="small secondary" onClick={() => editBook(book)}>Edit</button><button className="small danger" onClick={() => deleteBook(book._id)}>Delete</button></td></tr>)}</tbody>
        </table></div>}
    </section>
    <footer>Library Management System · MERN Stack</footer>
  </main>;
}
