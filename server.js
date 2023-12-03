const express = require('express');
const app = express();
app.use(express.json());

let books = []; // This will store our books data

// GET /books - List all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).send(`Book added with title: ${book.title}`);
});

// GET /books/:id - Get a specific book by ID
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const book = books.find(b => b.id === id);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// PUT /books/:id - Update a specific book by ID
app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
        books[index] = {...books[index], ...req.body};
        res.status(200).send(`Book with id ${id} updated`);
    } else {
        res.status(404).send('Book not found');
    }
});

// DELETE /books/:id - Delete a specific book by ID
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    books = books.filter(b => b.id !== id);
    res.status(200).send(`Book with id ${id} deleted`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
