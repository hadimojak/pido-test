import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  total: Number,
  dateTime: String,
  code: Number,
  image: String,
});

export const FormModel = mongoose.model('Form', FormSchema);
