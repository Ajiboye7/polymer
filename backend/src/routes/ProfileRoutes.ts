import express from 'express';
import { createProfile } from '../controller/ProfileController';
import requiredAuth from '../middleware/requiredAuth';

const router = express.Router()

//router.use(requiredAuth)

router.post('/create-profile', createProfile)

export default router