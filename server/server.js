import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//routes
import {router as apiRouter} from './routes/api.js';

const app = express();
const port = 5000;

mongoose.connect("mongodb+srv://c00kier:fXRTiEvwcsOUXvaD@cluster0.c98jvc7.mongodb.net/");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Server on: http://localhost:${port}`);
});