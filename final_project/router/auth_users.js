const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    // Assuming all usernames are valid for simplicity
    return true;
}

const authenticatedUser = (username, password) => {
    // Assuming all combinations of username and password are authenticated for simplicity
    return true;
}

// only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if username exists
    if (!isValid(username)) {
        return res.status(401).json({ message: "Invalid username." });
    }

    // Check if username and password match
    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ username: username }, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key

    // Return token
    res.json({ token: token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;

    // Check if review is provided
    if (!review) {
        return res.status(400).json({ message: "Review is required." });
    }

    // Check if book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found." });
    }

    // Add or update review
    books[isbn].reviews.push(review);

    // Return success response
    res.json({ message: "Review added successfully." });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
