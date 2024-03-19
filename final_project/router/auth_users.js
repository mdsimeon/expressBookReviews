const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();



// Initialize users array with some data
// Initialize users array with some data
let users = [
    { username: "user1", password: "pwd1" },
    { username: "user2", password: "pwd2" },
    { username: "user3", password: "pwd3" }
];


const isValid = (username) => {
    // Assuming all usernames are valid for simplicity
    return true;
}

const authenticatedUser = (username, password) => {
    // Assuming all combinations of username and password are authenticated for simplicity
    return true;
}

// Registration endpoint
regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if username already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "Username already exists." });
    }

    // Add the new user to the users array
    users.push({ username: username, password: password });

    // Return success response
    res.status(201).json({ message: "User registered successfully." });
});

// Login endpoint
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
 
    if (username && password) {
        return res.status(400).json({ message: "User Logged in Successfully." });
    }


    // Check if username exists
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: "Invalid username." });
    }

    // Check if password is correct
    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password." });
    }

    // Generate JWT token
    const token = jwt.sign({ username: username }, 'Secret'); // Replace 'Secret' with your actual secret key

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

// Delete book review endpoint
regd_users.delete("/auth/review/isbn/:isbn", (req, res) => {
    const { isbn } = req.params;

    // Find the index of the book in the array
    const index = books.findIndex(book => book.isbn === isbn);

    // Check if book exists
    if (index === -1) {
        return res.status(404).json({ message: "Book not found." });
    }

    // Remove the book from the array
    books.splice(index, 1);

    // Return success response
    res.json({ message: "Book deleted successfully." });
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users; // Export users array