const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
app.use(express.json());

// Define your book purchasing route with Basic Authentication
app.post(
  '/purchase/book',
  basicAuth({ users: { username: 'password' } }),
  async (req, res) => {
    // Book purchasing logic...
  }
);

// Endpoint to add books to Set and Map
app.post(
  '/books',
  basicAuth({ users: { username: 'password' } }),
  (req, res) => {
    const { books } = req.body;

    if (!Array.isArray(books)) {
      res.status(400).json({ error: 'Invalid book list' });
      return;
    }

    const bookSet = new Set();
    const bookMap = new Map();

    books.forEach((book, index) => {
      if (typeof book === 'object' && book.title && book.author) {
        bookSet.add(book.title);
        bookMap.set(index + 1, book);
      }
    });

    const response = {
      bookSet: Array.from(bookSet),
      bookMap: Object.fromEntries(bookMap),
    };

    res.status(200).json(response);
  }
);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
