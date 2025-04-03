import express from "express";
import { updateIdentity , identityNumber} from "../controller/IdentityController"


const router = express.Router()

router.put('/add-identity-type', updateIdentity);
router.put('/add-identity-number', identityNumber);

export default router