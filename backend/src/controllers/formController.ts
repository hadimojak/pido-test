import { Request, Response } from 'express';
import { FormModel } from '../models/formModel';
import redis from 'redis';

const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

export const submitForm = async (req: Request, res: Response) => {
  const formData = new FormModel(req.body);
  await formData.save();

  client.setex(`form:${formData._id}`, 3600, JSON.stringify(formData));
  res.json({ success: true, data: formData });
};

export const fetchForm = async (req: Request, res: Response) => {
  const { id } = req.params;

  client.get(`form:${id}`, async (err, data) => {
    if (data) return res.json(JSON.parse(data));

    try {
      const form = await FormModel.findById(id);
      if (form) {
        client.setex(`form:${id}`, 3600, JSON.stringify(form));
        res.json(form);
      } else {
        res.status(404).json({ error: 'Form not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Data retrieval error' });
    }
  });
};
