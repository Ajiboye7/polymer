import express from "express";
import cors from "cors";
import UserRoute from "../src/routes/UserRoute";
const app = express();
import { HOST, PORT } from "../../backend/src/config/env";
import connectToDatabase from "./database/mongodb";

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", UserRoute);

// Validate environment variables

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}`);
  connectToDatabase();
});
