import Book from '../models/book.js';

export const createBook = async (req, res) => {
    try{
        const { title, author, isbn, quantity, availableBooks } = req.body;
        if(!title || !author || !isbn || !quantity || !availableBooks) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(title.length < 3 || author.length < 3) {
            return res.status(400).json({ message: "Title and Author must be at least 3 characters long" });
        }
        if(quantity <= 0 || availableBooks <= 0) {
            return res.status(400).json({ message: "Quantity and Available Books cannot be negative" });

        if(quantity < availableBooks) {
            return res.status(400).json({ message: "Available Books cannot exceed Quantity" });
        }
        const newBook = new Book({
            title,
            author,
            isbn,
            quantity,
            availableBooks
        });
        await newBook.save();
        res.status(201).json({ message: "Book created successfully", book: newBook });
    }
    }catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ message: "Books retrieved successfully", books });
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getBookByIsbn = async (req, res) => {
    try {
        const { isbn } = req.params;
        const book = await Book.findOne({ isbn });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book retrieved successfully", book });
    } catch (error) {
        console.error("Error retrieving book by ISBN:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateBook = async (req, res) => {
    try {
        const { isbn } = req.params;
        const { title, author, quantity, availableBooks } = req.body;

        const book = await Book.findOneAndUpdate(
            { isbn },
            { title, author, quantity, availableBooks, updatedAt: Date.now() },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully", book });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { isbn } = req.params;
        const book = await Book.findOneAndDelete({ isbn });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}