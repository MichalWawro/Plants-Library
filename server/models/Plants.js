import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const plantSchema = new Schema({
  plantInfo: Object,
  createdAt: Date,
  updatedAt: Date
});

const Plant = model('Plant', plantSchema);


export default Plant;