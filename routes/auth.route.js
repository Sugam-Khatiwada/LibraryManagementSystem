import express from 'express';

import {verifyToken, authorizationRoles} from '../middleware/verifytoken.js';
import { loginUser,registerUser } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/register', verifyToken, authorizationRoles('Librarian'), registerUser);
router.post('/login', loginUser);

export default router;