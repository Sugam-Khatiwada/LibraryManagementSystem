import express from "express";
import {
  borrowBook,
  returnBook,
  borrowHistory,
  getAllBorrowers,
  updateBorrower,
  deleteBorrower
} from "../controller/borrow.controller.js";
import { authorizationRoles, verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.post(
  "/borrow",
  verifyToken,
  authorizationRoles("Borrower", "Librarian"),
  borrowBook
);
router.post(
  "/borrow/return/:borrowId",
  verifyToken,
  authorizationRoles("Borrower", "Librarian"),
  returnBook
);

router.get(
  "/borrow/history",
  verifyToken,
  authorizationRoles("Borrower"),
  borrowHistory
);
router.get(
  "/borrowers",
  verifyToken,
  authorizationRoles("Librarian"),
  getAllBorrowers
);

router.put(
  "/borrowers/:borrowerId",
  verifyToken,
  authorizationRoles("Librarian"),
  updateBorrower
);

router.delete(
  "/borrowers/:borrowerId",
  verifyToken,
  authorizationRoles("Librarian"),
  deleteBorrower
);

export default router;