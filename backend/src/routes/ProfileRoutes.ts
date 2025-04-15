import express from 'express';
import { createProfile, uploadProfilePicture } from '../controller/ProfileController';
import requiredAuth from '../middleware/requiredAuth';
import { upload } from '../middleware/imageUploadMiddleware';

const router = express.Router();


router.post('/create-profile', requiredAuth, createProfile);
router.post('/upload-picture', requiredAuth, upload.single('photo'), uploadProfilePicture);

export default router;