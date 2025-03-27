import express from 'express';
import { chatbotController } from '../controllers/chatbotController.js';

const ChatbotRouter = express.Router();

ChatbotRouter.post('/message', chatbotController);

export default ChatbotRouter;
