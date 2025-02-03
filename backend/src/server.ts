import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import formRoutes from './routes/formRoutes';

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/service_db');

app.use('/api', formRoutes);

app.listen(4000, () => console.log('Backend running on port 4000'));
