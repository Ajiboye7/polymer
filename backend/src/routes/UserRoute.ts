import { signInUser,  signUpUser } from "../controller/UserController"
import express from "express"

const router = express.Router()

router.post("/api/users", signUpUser);

router.post("/api/users/login", signInUser);

export default router