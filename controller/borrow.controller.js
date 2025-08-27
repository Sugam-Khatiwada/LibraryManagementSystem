import Borrow from '../models/borrow.js';
import Book from '../models/book.js';

export const borrowBook = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.availableBooks <= 0) {
      return res
        .status(400)
        .json({ message: "No available copies of the book" });
    }
    const existingBorrow = await Borrow.findOne({
      userId,
      bookId,
    });
    if (existingBorrow) {
      return res
        .status(400)
        .json({ message: "You have already borrowed this book" });
    }

    const newBorrow = new Borrow({
      userId,
      bookId,
    });

    await newBorrow.save();

    book.availableBooks -= 1;
    await book.save();

    res
      .status(201)
      .json({ message: "Book borrowed successfully", borrow: newBorrow });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/borrowController.js (replace returnBook)
export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    // Detect existing return in a tolerant way (handles undefined/null and various field names)
    const existingReturn =
      borrow.returnDate ?? borrow.returnedAt ?? borrow.returned_at ?? borrow.return_date ?? null;

    if (existingReturn != null) {
      // Idempotent: return success with the borrow record so client can read the timestamp
      return res.status(200).json({ message: "Book already returned", borrow });
    }

    // Mark as returned (set common return fields)
    const now = new Date();
    borrow.returnDate = now;
    borrow.returnedAt = now;
    // optionally borrow.returned = true; if you track a boolean

    await borrow.save();

    const book = await Book.findById(borrow.bookId);
    if (book) {
      // guard against NaN / missing value
      book.availableBooks = (Number(book.availableBooks) || 0) + 1;
      await book.save();
    }

    return res.status(200).json({ message: "Book returned successfully", borrow });
  } catch (error) {
    console.error("Error returning book:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const borrowHistory = async (req, res) => {
    try{
        const userId = req.user.id;
        const borrows = await Borrow.find({ userId }).populate('bookId', 'title author isbn');
        if (borrows.length === 0) {
            return res.status(404).json({ message: "No borrow records found for this user" });
        }
        res.status(200).json({ message: "Borrow history retrieved successfully", borrows });

}catch (error) {
        console.error("Error retrieving borrow history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateBorrower = async (req, res) => {
  try {
    const { borrowerId } = req.params;
    const updates = req.body;

    const updatedBorrower = await Borrow.findByIdAndUpdate(borrowerId, updates, {
      new: true,
    });

    if (!updatedBorrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    res.status(200).json({ message: "Borrower updated successfully", borrower: updatedBorrower });
  } catch (error) {
    console.error("Error updating borrower:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteBorrower = async (req, res) => {
  try {
    const { borrowerId } = req.params;

    const deletedBorrower = await Borrow.findByIdAndDelete(borrowerId);

    if (!deletedBorrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    res.status(200).json({ message: "Borrower deleted successfully", borrower: deletedBorrower });
  } catch (error) {
    console.error("Error deleting borrower:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrow.find().populate('userId', 'name email').populate('bookId', 'title author');
    res.status(200).json({ message: "All borrowers retrieved successfully", borrowers });
  } catch (error) {
    console.error("Error retrieving all borrowers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};