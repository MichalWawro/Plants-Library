import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//routes
import { router as apiRouter } from './routes/api.js';

dotenv.config();
const { MONGO_URL } = process.env;

const app = express();
const port = 5000;

mongoose.connect(MONGO_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Server on: http://localhost:${port}`);
});

