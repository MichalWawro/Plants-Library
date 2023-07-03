import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const profileSchema = new Schema({
    userId: String,
    userName: String,
    plantsIds: Array,
    plants: Array,
    achivements: Array
})

const Profile = model("Profile", profileSchema);
export default Profile;