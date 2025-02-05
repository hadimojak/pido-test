import { Request, Response, NextFunction } from "express";
import { FormModel, IMongooseError, IForm } from "../models/formModel";
import { createClient } from "redis";
import { sendResponse } from "../utils/responseHanlder";

const redisHost = process.env.REDIS_HOST as string;
const redisPort = Number(process.env.REDIS_PORT);
const redisPassword = process.env.REDIS_PASSWORD as string;

const client = createClient({ socket: { host: redisHost, port: redisPort }, password: redisPassword });

client
  .connect()
  .then(() => console.log("Redis connected successfully"))
  .catch((err) => console.error("Redis connection error:", err));

export const submitForm = async (req: Request, res: Response, next: NextFunction) => {
  req.body._id = req.body.id;
  delete req.body.id;

  try {
    const formData = new FormModel(req.body);
    const response: IForm = await formData.save();
    client.setEx(`form:${formData._id}`, 3600, JSON.stringify(formData));

    res.status(201).send({ success: true, data: { total: response.total, dateTime: response.dateTime, code: response.code, image: response.image } });
  } catch (error) {
    const mongooseError = error as IMongooseError;

    if (mongooseError.message.includes("duplicate")) res.status(520).json({ message: "duplicate primary key", code: 1403 });
  }
  next();
};

export const fetchForm = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  // client.get();
  // client.get(`form:${id}`, async (err: Error, data: any) => {
  //   if (data) return res.json(JSON.parse(data));

  // try {
  //   const form = await FormModel.findById(id);
  //   if (form) {
  //     // client.setex(`form:${id}`, 3600, JSON.stringify(form));
  //     res.json(form);
  //   } else {
  //     res.status(404).json({ error: "Form not found" });
  //   }
  // } catch (error) {
  //   res.status(500).json({ error: "Data retrieval error" });
  // }
  // });
  res.send("OK");
};
