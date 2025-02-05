import mongoose, { Document, Schema } from "mongoose";

export interface IForm extends Document {
  _id: string; 
  total: number;
  dateTime: string;
  code: number;
  image: string;
}

const FormSchema = new Schema<IForm>({
  _id: { type: String, required: true }, 
  total: { type: Number, required: true },
  dateTime: { type: String, required: true },
  code: { type: Number, required: true },
  image: { type: String, required: true },
});

export interface IMongooseError extends Error {
  name: string;
  code?: number;
  keyValue?: Record<string, any>;
  errors?: Record<string, { message: string }>;
}

export const FormModel = mongoose.model<IForm>("Form", FormSchema);

