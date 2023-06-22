import express from "express";
import bcrypt from 'bcrypt';

//models
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";

const router = express.Router();

router.route("/myplants")
    .get((req, res) => {
        res.status(200).json("Działa");
    })

router.route("/users")
    .post(async (req, res) => {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
                userName: req.body.username,
                password: hashedPassword,
                email: req.body.email
            })
            await Profile.create({
                userId: user._id,
                plants: [],
                achivements: []
            })
            res.status(201).json("Created");
        } catch (error) {
            res.status(400).json("Something went wrong... Try Again");
        }
    })

router.route("/users/login")
    .post(async (req, res) => {
        try {
            const users = await User.find({});
            const user = users.find(user => user.userName === req.body.username);
            if (user === undefined) {
                return res.status(400).json("Cannot find user");
            }
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.redirect(301, "http://localhost:3000/home");
            } else {
                return res.status(400).json("Not Allowed")
            }

        } catch (error) {
            res.status(400).json("Something went wrong... Try Again");
        }
    })

export { router };