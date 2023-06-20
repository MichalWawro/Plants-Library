import express from "express";

const router = express.Router();

router.route("/myplants")
    .get((req, res) => {
        res.status(200).send("Działa");
    })



export {router};