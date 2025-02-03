import express from 'express';
import { submitForm, fetchForm } from '../controllers/formController';

const router = express.Router();

router.post('/submit', submitForm);
router.get('/fetch/:id', fetchForm);

export default router;
