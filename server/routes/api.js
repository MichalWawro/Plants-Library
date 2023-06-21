import express from "express";
import bcrypt from 'bcrypt';

//models
import { User } from "../models/User.js";

const router = express.Router();

router.route("/myplants")
    .get((req, res) => {
        res.status(200).send("Działa");
    })

router.route("/users")
    .post(async (req, res) => {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            await User.create({
                userName: req.body.username,
                password: hashedPassword,
                email: req.body.email
            })
            res.status(201).send("Created");
        } catch (error) {
            res.status(400).send("Something went wrong... Try Again");
        }
    })

router.route("/users/login")
    .post(async (req, res) => {
        try {
            const users = await User.find({});
            const user = users.find(user => user.userName === req.body.username);
            if (user === undefined) {
                return res.status(400).send("Cannot find user");
            }
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.redirect(301, "http://localhost:3000/home");
            } else {
                return res.status(400).send("Not Allowed")
            }

        } catch (error) {
            res.status(400).send("Something went wrong... Try Again");
        }
    })

export { router };