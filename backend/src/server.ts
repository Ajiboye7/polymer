import express from "express";
import cors from "cors";
import UserRoute from "../src/routes/UserRoute";
import OtpRoute from "../src/routes/OtpRoutes";
import IdentityRoute from "../src/routes/IdentityRoute";
import PinRoutes from "../src/routes/PinRoutes"
import AccountTypeRoute from '../src/routes/AccountTypeRoute'
import ProfileRoutes from '../src/routes/ProfileRoutes'

import { HOST, PORT } from "../../backend/src/config/env";
import connectToDatabase from "./database/mongodb";

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", UserRoute);
app.use("/api/auth", OtpRoute);
app.use("/api/auth", IdentityRoute);
app.use("/api/auth", PinRoutes)
app.use('/api/auth', AccountTypeRoute)

app.use('/user/profile', ProfileRoutes)

// Validate environment variables

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}`);
  connectToDatabase();
});
