import { Request, Response, urlencoded } from "express";
import { FormModel } from "../models/formModel";
import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST as string;
const redisPort = Number(process.env.REDIS_PORT);
const redisPassword = process.env.REDIS_PASSWORD as string;

const client = createClient({ socket: { host: redisHost, port: redisPort }, password: redisPassword });

client
  .connect()
  .then(() => console.log("Redis connected successfully"))
  .catch((err) => console.error("Redis connection error:", err));

export const submitForm = async (req: Request, res: Response) => {
  console.log(req.body);

  // const formData = new FormModel(req.body);
  // console.log(formData);

  // await formData.save();

  // client.setEx(`form:${formData._id}`, 3600, JSON.stringify(formData));
  res.json({ success: true, data: "formData" });
};

export const fetchForm = async (req: Request, res: Response) => {
  const { id } = req.params;

  // client.get(`form:${id}`, async (err: Error, data: any) => {
  //   if (data) return res.json(JSON.parse(data));

  //   try {
  //     const form = await FormModel.findById(id);
  //     if (form) {
  //       // client.setex(`form:${id}`, 3600, JSON.stringify(form));
  //       res.json(form);
  //     } else {
  //       res.status(404).json({ error: "Form not found" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: "Data retrieval error" });
  //   }
  // });
  res.send("OK");
};
