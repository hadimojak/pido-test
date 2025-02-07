import dotenv from "dotenv";

dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import formRoutes from "./routes/formRoutes";

const PORT: number = Number(process.env.PORT);
const HOSTNAME: string = process.env.HOSTNAME as string;

const MONGOURL: string = process.env.MONGO_URI?.toString()!;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", formRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};

dbConnection().then(() => {
  app.listen(PORT, HOSTNAME, async (err) => {
    if (err) console.log(err);
    console.log("backend run on port 4000");
  });
});
