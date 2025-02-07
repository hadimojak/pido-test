import { RequestHandler } from "express";
import { FormModel, IMongooseError, IForm } from "../models/formModel";
import { Total, TotalModel } from "../models/totalModel";
import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST as string;
const redisPort = Number(process.env.REDIS_PORT);
const redisPassword = process.env.REDIS_PASSWORD as string;

const client = createClient({
  socket: { host: redisHost, port: redisPort },
  password: redisPassword,
});

client
  .connect()
  .then(() => console.log("Redis connected successfully"))
  .catch((err) => console.error("Redis connection error:", err));

export const submitForm: RequestHandler = async (req, res, next): Promise<any> => {
  req.body._id = req.body.id;
  delete req.body.id;

  try {
    const formData = new FormModel(req.body);
    const response: IForm = await formData.save();
    client.setEx(`form:${formData._id}`, 3600, JSON.stringify(formData));

    return res.status(201).json({
      success: true,
      data: {
        total: response.total,
        dateTime: response.dateTime,
        code: response.code,
        image: response.image,
      },
    });
  } catch (error) {
    const mongooseError = error as IMongooseError;

    if (mongooseError.message.includes("duplicate")) {
      throw new Error("duplicate primary key");
    }
  }
};

export const fetchForm: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const { id } = req.params;
    const redisData = await client.get(`form:${id}`);
    if (redisData) {
      const form: IForm = <IForm>await FormModel.findById(id);

      const oldTotal = form.total;
      const newTotal = oldTotal + 10;

      await FormModel.findByIdAndUpdate(id, { total: newTotal });
      const newForm: IForm = <IForm>await FormModel.findById(id);

      const totalHistory = new TotalModel({
        userId: id,
        oldTotal,
        newTotal,
      });

      await totalHistory.save();
      console.log({ newForm });

      return res.status(201).json(newForm);
    }
  } catch (error) {
    throw new Error("invalid redis status");
  }
};
