import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        description: "Reference to the user who borrowed the book",
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
        description: "Id of the book being borrowed",
    },
    borrowDate: {
        type: Date,
        default: Date.now,
        description: "Date when the book was borrowed",
    },
    returnDate: {
        type: Date,
      
        description: "Date when the book is expected to be returned",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        description: "Timestamp when the borrow record was created",
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        description: "Timestamp when the borrow record was last updated",
    }
})

const Borrow = mongoose.model("Borrow", userSchema);
export default Borrow;