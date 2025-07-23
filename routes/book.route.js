import express from 'express';
import { createBook, getAllBooks, getBookByIsbn, updateBook, deleteBook } from '../controller/book.controller.js';

import { authorizationRoles, verifyToken } from '../middleware/verifytoken.js';

const router = express.Router();

router.post('/books', verifyToken, authorizationRoles('Librarian'), createBook);
router.get('/books', verifyToken, authorizationRoles('Librarian'), getAllBooks);
router.get('/books/:isbn', verifyToken, authorizationRoles('Librarian'), getBookByIsbn);
router.put('/books/:isbn', verifyToken, authorizationRoles('Librarian'), updateBook);
router.delete('/books/:isbn', verifyToken, authorizationRoles('Librarian'), deleteBook);

export default router;

