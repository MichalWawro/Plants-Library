import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//routes
import { router as apiRouter } from './routes/api.js';
import Plant from './models/Plants.js';

const app = express();
const port = 5000;

mongoose.connect("mongodb+srv://1657358923:UnEN9kYdfFEVX1Xi@165735892.x9rcfss.mongodb.net/");

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Server on: http://localhost:${port}`);
});

app.use(function (req, res, next) {
    res.header("Acess-Control-Allow-Origin", "https://localhost:3000");
    res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Acess-Control-Allow-Methods", "POST");
    next();
})

app.post('/plant', async (req, res) => {
    console.log(req.body);
    try {
        const plantInfo = req.body;
        const createdAt = Date.now();
        const updatedAt = Date.now();
        await new Plant.create({
            plantInfo,
            createdAt,
            updatedAt
        })
        res.status(200);
    } catch (error) {
        res.status(400).json('Something went wrong');
    }

})