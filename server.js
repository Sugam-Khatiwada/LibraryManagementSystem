import express from 'express';
import dotenv from 'dotenv';
import connectDB  from './config/database.js';
import router from './routes/book.route.js';
import authRouter from './routes/auth.route.js';
import borrowerRouter from './routes/borrower.route.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', router);
app.use('/api', authRouter);
app.use('/api', borrowerRouter);


const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});













