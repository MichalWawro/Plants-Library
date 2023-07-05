import express from "express";
import bcrypt from 'bcrypt';

//models
import User from "../models/User.js";
import Profile from "../models/Profile.js";

const router = express.Router();

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
            res.status(201).send(JSON.stringify([profile]));
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
                const profile = await Profile.find({ userId: user._id });
                res.status(201).send(JSON.stringify(profile));
            } else {
                return res.status(400).json("Not Allowed")
            }

        } catch (error) {
            res.status(400).json("Something went wrong... Try Again");
        }
    })

router.route("/plant")
    .patch(async (req, res) => {
        try {
            const profile = await Profile.find({ userId: req.body.userId });
            if (!profile[0].plantsIds.includes(req.body.plantId)) {
                profile[0].plantsIds.push(req.body.plantId);
                profile[0].plants.push(req.body.plant);
                await profile[0].save();
                return res.status(204);
            } else {
                res.status(400).json("Plant already added...");
            }
        } catch (error) {
            res.status(400).json("Something went wrong...");
        }
    })    
    .delete(async (req, res) => {
        try {
            const {plant, userID} = req.body;
            const profile = await Profile.find({ userId: userID });
            const indexID = profile[0].plantsIds.findIndex(element => element === plant.id);
            const indexObject = profile[0].plants.findIndex(element => element.id === plant.id);
            profile[0].plantsIds.splice(indexID, 1);
            profile[0].plants.splice(indexObject, 1);
            await profile[0].save();
            res.status(204).json("Removed");
        } catch (error) {
            res.status(400).json("Something went wrong...");
        }
    })

router.route("/plant/watering")
.patch(async (req,res) =>{
    try {
        const {userId, editedPlant, wateringFrequency} = req.body;
        const profile = await Profile.find({userId});
        const plantIndex = profile[0].plants.findIndex(element => element.id === editedPlant.id);
        profile[0].plants[plantIndex].wateringFrequency = wateringFrequency;
        profile[0].plants[plantIndex].lastWatering = Date.now();
        profile[0].markModified("plants");
        await profile[0].save();
        res.status(200).json("Updated");
    } catch (error) {
        res.status(400).json("Something went wrong...");
    }
})

router.route("/profile")
    .post(async (req, res) => {
        try {
            const profile = await Profile.find(req.body);
            res.status(201).send(JSON.stringify(profile));
        } catch (error) {
            res.status(400).json("Something went wrong...");
        }
    })


export { router };