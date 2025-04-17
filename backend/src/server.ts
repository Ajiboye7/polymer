import express from "express";
import cors from "cors";
import UserRoute from "../src/routes/UserRoute";
import OtpRoute from "../src/routes/OtpRoutes";
import IdentityRoute from "../src/routes/IdentityRoute";
import PinRoutes from "../src/routes/PinRoutes";
import AccountTypeRoute from "../src/routes/AccountTypeRoute";
import ProfileRoutes from "../src/routes/ProfileRoutes";

import { HOST, PORT } from "../../backend/src/config/env";
import connectToDatabase from "./database/mongodb";
import path from "path";

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    exposedHeaders: ["Content-Disposition"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", UserRoute);
app.use("/api/auth", OtpRoute);
app.use("/api/auth", IdentityRoute);
app.use("/api/auth", PinRoutes);
app.use("/api/auth", AccountTypeRoute);

app.use("/user/profile", ProfileRoutes);

const uploadsDir = path.join(__dirname, "../../backend/uploads");

app.use(
  "/uploads",
  express.static(uploadsDir, {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);

export default app;

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}`);
  connectToDatabase();
});
