import dotenv from "dotenv";

dotenv.config();

import express from "express";
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

app.listen(PORT, HOSTNAME, async (err) => {
  if (err) console.log(err);
  await mongoose
    .connect(MONGOURL)
    .then(() => console.log("MongoDB connected successfully'"))
    .catch((err) => console.log("MongoDB connection error:", err))
    .finally(() => {
      mongoose.connection.close();
    });
  console.log("backend run on port 4000");
});
