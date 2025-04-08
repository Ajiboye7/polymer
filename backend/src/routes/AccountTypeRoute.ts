import express from "express";
import {accountType} from '../controller/AccountTypecontroller'

const router = express.Router()

router.put('/add-account-type', accountType)

export default router