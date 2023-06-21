import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//routes
import {router as apiRouter} from './routes/api.js';

const app = express();
const port = 5000;

mongoose.connect("mongodb+srv://1657358923:UnEN9kYdfFEVX1Xi@165735892.x9rcfss.mongodb.net/");

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Server on: http://localhost:${port}`);
})