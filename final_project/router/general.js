const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req,res) => {
    const { username, password } = req.body;

    // Check if username is valid
    if (!isValid(username)) {
        return res.status(400).json({ message: "Invalid username." });
    }

    // Check if username already exists
    if (users.includes(username)) {
        return res.status(400).json({ message: "Username already exists." });
    }

    // Add the user to the list of registered users
    users.push(username);
    return res.status(200).json({ message: "User registered successfully." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.status(200).json({ books: books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const { isbn } = req.params;
    const book = books.find(book => book.isbn === isbn);
    if (!book) {
        return res.status(404).json({ message: "Book not found." });
    }
    return res.status(200).json({ book: book });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const { author } = req.params;
    const booksByAuthor = books.filter(book => book.author === author);
    if (booksByAuthor.length === 0) {
        return res.status(404).json({ message: "Books by author not found." });
    }
    return res.status(200).json({ books: booksByAuthor });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const { title } = req.params;
    const booksByTitle = books.filter(book => book.title === title);
    if (booksByTitle.length === 0) {
        return res.status(404).json({ message: "Books with title not found." });
    }
    return res.status(200).json({ books: booksByTitle });
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const { isbn } = req.params;
    const book = books.find(book => book.isbn === isbn);
    if (!book || !book.review) {
        return res.status(404).json({ message: "Review not found." });
    }
    return res.status(200).json({ review: book.review });
});

module.exports.general = public_users;
