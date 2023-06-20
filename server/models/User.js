import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema({
    userName: String,
    password: String,
    email: String
})

export const User = model("User", userSchema);