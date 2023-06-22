import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const plantSchema = new Schema({
  plantInfo: Object,
  createdAt: Date,
  updatedAt: Date
});

export const Plant = model("Plant", plantSchema);