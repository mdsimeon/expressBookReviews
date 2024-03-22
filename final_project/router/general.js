//general.js


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

public_users.get('/', (req, res) => {
    // Assuming books is an object where keys are ISBNs and values are book details
    const allBooks = Object.values(books);
    const sortedBooks = allBooks.sort((a, b) => (a.isbn > b.isbn) ? 1 : -1);
    res.json(sortedBooks);
});


// Get book details based on ISBN
// Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
//     const { isbn } = req.params;
//     const bookArray = Object.values(books); // Convert books object into an array
//     const book = bookArray.find(book => book.isbn === isbn);
//     if (!book) {
//         return res.status(404).json({ message: "Book not found." });
//     }
//     return res.status(200).json({ book: book });
// });

// public_users.get('/isbn/:isbn', function (req, res) {
//     const { isbn } = req.params;
//     const bookArray = Object.values(books); // Convert books object into an array
//     const book = bookArray.find(book => book.isbn === isbn);
//     if (!book) {
//         return res.status(404).json({ message: "Book not found." });
//     }
//     return res.status(200).json({ book: book });
// });

public_users.get('/isbn/:isbn', function (req, res) {
    const { isbn } = req.params;
    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: "Book not found." });
    }
    return res.status(200).json({ book: book });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const { author } = req.params;
    const bookArray = Object.values(books); // Convert books object into an array
    const booksByAuthor = bookArray.filter(book => book.author === author);
    if (booksByAuthor.length === 0) {
        return res.status(404).json({ message: "Books by author not found." });
    }
    return res.status(200).json({ books: booksByAuthor });
});
// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const { title } = req.params;
    
    const bookArray = Object.values(books); // Convert books object into an array
    const booksByTitle = bookArray.filter(book => book.title === title);
    
    if (booksByTitle.length === 0) {
        return res.status(404).json({ message: "Books with title not found." });
    }
    
    return res.status(200).json({ books: booksByTitle });
});



// Get book review
// public_users.get('/review/:isbn', function (req, res) {
//     const { isbn } = req.params;
    
//     // Convert books object into an array
//     const bookArray = Object.values(books);
    
//     // Find the book by ISBN in the array
//     const book = bookArray.find(book => book.isbn === isbn);
    
//     // Check if the book or its reviews are missing
//     if (!book || !book.reviews) {
//         return res.status(404).json({ message: "Reviews not found for this book." });
//     }
    
//     // Return the reviews
//     return res.status(200).json({ reviews: book.reviews });
// });

// public_users.get('/review/:isbn', function (req, res) {
//     const { isbn } = req.params;
    
//     // Find the book by ISBN directly from the books object
//     const book = books[isbn];
    
//     // Check if the book exists and has reviews
//     if (!book || !book.reviews || Object.keys(book.reviews).length === 0) {
//         return res.status(404).json({ message: "Reviews not found for this book." });
//     }
    
//     // Return the reviews
//     return res.status(200).json({ reviews: book.reviews });
// });

// public_users.get('/review/:isbn', function (req, res) {
//     const { isbn } = req.params;
    
//     // Find the book by ISBN directly from the books object
//     const book = books[isbn];

//     console.log("Book:", book); // Log the book object for debugging
    
//     // Check if the book exists
//     if (!book) {
//         console.log("Book not found for ISBN:", isbn); // Log ISBN for debugging
//         return res.status(404).json({ message: "Book not found." });
//     }
    
//     // Check if the book has reviews
//     if (!book.reviews || Object.keys(book.reviews).length === 0) {
//         console.log("Reviews not found for book with ISBN:", isbn); // Log ISBN for debugging
//         return res.status(404).json({ message: "Reviews not found for this book." });
//     }
    
//     // Return the reviews
//     return res.status(200).json({ reviews: book.reviews });
// });

// public_users.get('/review/:isbn', function (req, res) {
//     const { isbn } = req.params;

//     console.log("Requested ISBN:", isbn); // Log the ISBN requested for debugging
    
//     // Find the book by ISBN directly from the books object
//     const book = books[isbn];

//     console.log("Book:", book); // Log the book object for debugging
    
//     // Check if the book exists
//     if (!book) {
//         console.log("Book not found for ISBN:", isbn); // Log ISBN for debugging
//         return res.status(404).json({ message: "Book not found." });
//     }
    
//     // Check if the book has reviews
//     if (!book.reviews || Object.keys(book.reviews).length === 0) {
//         console.log("Reviews not found for book with ISBN:", isbn); // Log ISBN for debugging
//         return res.status(404).json({ message: "Reviews not found for this book." });
//     }
    
//     // Return the reviews
//     return res.status(200).json({ reviews: book.reviews });
// });

public_users.get('/review/:isbn', function (req, res) {
    const { isbn } = req.params;

    console.log("Requested ISBN:", isbn); // Log the ISBN requested for debugging
    
    // Find the book by ISBN directly from the books object
    const book = books[isbn];

    console.log("Book:", book); // Log the book object for debugging
    
    // Check if the book exists
    if (!book) {
        console.log("Book not found for ISBN:", isbn); // Log ISBN for debugging
        return res.status(404).json({ message: "Book not found." });
    }
    
    // If the book has no reviews, return an empty array
    if (!book.reviews || Object.keys(book.reviews).length === 0) {
        console.log("No reviews found for book with ISBN:", isbn); // Log ISBN for debugging
        return res.status(200).json({ reviews: [] });
    }
    
    // Return the reviews
    return res.status(200).json({ reviews: book.reviews });
});


module.exports.general = public_users;