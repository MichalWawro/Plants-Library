import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//routes
import { router as apiRouter } from './routes/api.js';

const app = express();
const port = 5000;

mongoose.connect("mongodb+srv://c00kier:fXRTiEvwcsOUXvaD@cluster0.c98jvc7.mongodb.net/");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(function(req,res,next) {
    res.header("Acess-Control-Allow-Origin", "https://localhost:3000");
    res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Server on: http://localhost:${port}`);
});

