import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        description: "Title of the book",
        trim: true
    },
    author: {
        type: String,
        required: true,
        description: "Author of the book",
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        description: "ISBN number of the book",
        trim: true,
        unique: true
    },
    quantity:{
        type: Number,
        required: true,
        description: "Number of copies available in the library",
        min: [0, "Quantity cannot be negative"],
    },
    availableBooks: {
        type: Number,
        required: true,
        description: "Number of copies currently available for borrowing",
        min: [0, "Available books cannot be negative"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        description: "Timestamp when the book was added to the library"
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        description: "Timestamp when the book details were last updated"
    }
})

const Book = mongoose.model("Book", bookSchema);
export default Book;