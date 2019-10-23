import path from 'path';
import express from 'express';
import { homeController } from '../controllers/homeController';

const router = express.Router();

router.get('/', homeController);

export default router;
