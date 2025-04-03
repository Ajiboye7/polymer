import express from "express"
import { createPin, confirmPin } from "../controller/PinController"

const router = express.Router()

router.put('/create-pin', createPin);
router.post('/confirm-pin', confirmPin);


export default router