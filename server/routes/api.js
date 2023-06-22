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
            const profile = await Profile.create({
                userId: user._id,
                userName: user.userName,
                plants: [],
                achivements: []
            })
            res.send(JSON.stringify(profile));
        } catch (error) {
            res.status(400).json("Something went wrong... Try Again");
        }
    })

router.route("/plant")
    .post(async (req, res) => {
        console.log(req.body)
        try {
            const plantInfo = req.body;
            Profile.findOne({ userName: "123" })
                .then(profile => {
                    profile.plants.push(plantInfo)
                    return profile.save();
                })
                .then(profile => {
                    console.log(profile);
                })
                .catch(error => {
                    console.error(error);
                })
            res.send(JSON.stringify(profile));
        } catch (error) {
            res.status(400).json("Something went wrong");
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
                const profile = await Profile.find({userId : user._id});
                res.send(JSON.stringify(profile));
            } else {
                return res.status(400).json("Not Allowed")
            }

        } catch (error) {
            res.status(400).json("Something went wrong... Try Again");
        }
    })

export { router };