import mongoose, { Document, Schema } from "mongoose";

export interface Total extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    oldTotal: number;
    newTotal: number;
    updatedAt: Date;
}

const TotalSchema = new Schema<Total>({
    userId: { type: String, required: true },
    oldTotal: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
    newTotal: { type: Number, required: true },
});


export const TotalModel = mongoose.model<Total>("Total", TotalSchema);

