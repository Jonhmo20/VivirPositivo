// routes/chatRoutes.ts
import express from 'express';
import { handleMessage } from '../controllers/chatController';

const router = express.Router();

router.post('/', handleMessage);

export default router;