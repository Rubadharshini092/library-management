# 📚 BookNest - Simple MERN Library Management System

A complete, clean, beginner-friendly **MERN Stack CRUD Application** (MongoDB, Express, React, Node.js) built for a College FSWD Lab on **macOS (Apple Silicon / M1 / M2 / M3)** and **VS Code**.

---

## 📁 Final Project Structure

```text
library-management/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Overview with metric cards & recent books preview
│   │   │   ├── Books.jsx          # READ & DELETE: Responsive table with instant search & delete
│   │   │   ├── AddBook.jsx        # CREATE: Form to register a new book
│   │   │   └── EditBook.jsx       # UPDATE: Form pre-filled to edit an existing book
│   │   ├── App.jsx                # Header Navbar & React Router routing
│   │   ├── main.jsx               # React 18 DOM mount point
│   │   ├── App.css                # Clean Blue & White theme styling
│   │   └── index.css              # Basic CSS reset
│   ├── index.html                 # HTML shell
│   ├── vite.config.js             # Vite development server configuration
│   └── package.json               # Client dependencies (React, Vite, Axios, React Router)
│
├── server/
│   ├── models/
│   │   └── Book.js                # Mongoose Schema (Title, Author, ISBN, Category, Quantity)
│   ├── routes/
│   │   └── bookRoutes.js          # REST CRUD endpoints (GET, POST, PUT, DELETE)
│   ├── server.js                  # Express app, MongoDB connection, CORS, JSON parser
│   ├── .env                       # PORT=5000 and MONGO_URI
│   └── package.json               # Server dependencies (Express, Mongoose, CORS, Dotenv, Nodemon)
│
└── README.md
```

---

## ⚡ Step-by-Step Instructions to Run in VS Code on macOS

### 1. Open the Project in VS Code
Open your Mac Terminal (`zsh`) and navigate to the project directory:
```zsh
cd ~/Documents/library-management
code .
```

---

### 2. Ensure Local MongoDB is Running
Make sure MongoDB Community Edition service is started via Homebrew:
```zsh
brew services start mongodb-community@8.0
```
*(To verify with mongosh, run `mongosh`, execute `show dbs`, and type `exit`)*.

---

### 3. Start the Backend Server
Inside VS Code, open the integrated terminal (press `` Ctrl + ` ``):
```zsh
cd server
npm install
npm run dev
```

**Expected Terminal Output:**
```text
[nodemon] starting `node server.js`
✅ MongoDB Connected successfully
🚀 Server running on http://localhost:5000
```

---

### 4. Start the Frontend Client
In VS Code, open a **second terminal tab** (click the `+` icon on the top right of the terminal panel):
```zsh
cd client
npm install
npm run dev
```

**Expected Terminal Output:**
```text
  VITE v6.0.7  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### 5. Open Your Browser
Open Safari or Chrome and visit:
👉 **`http://localhost:5173`**

---

## 🎯 4 Core CRUD Operations in BookNest

1. **Add Book (CREATE)**:
   - Click **+ Add Book** in the navigation bar.
   - Enter Title, Author, ISBN, Category, and Quantity.
   - Click **Save Book** — the book is inserted into MongoDB, and you are redirected to `/books`.
2. **View Books (READ)**:
   - Click **Manage Books** to see all books inside a responsive table.
   - Use the **Search bar** to instantly filter by Title, Author, ISBN, or Category.
3. **Edit Book (UPDATE)**:
   - Click the yellow **Edit** button next to any book.
   - The form opens pre-filled with the existing values.
   - Modify any field and click **Update Book** to save changes to MongoDB.
4. **Delete Book (DELETE)**:
   - Click the red **Delete** button next to any book.
   - Confirm the dialog (`window.confirm`) to permanently remove the book from MongoDB.
