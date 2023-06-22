import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const profileSchema = new Schema({
    userId: String,
    plants: Array,
    achivements: Array
})

export const Profile = model("Profile", profileSchema);