import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import UserRoute from "../src/routes/UserRoute"
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', UserRoute);

// Validate environment variables
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env");
}
if (!process.env.SECRET) {
  throw new Error("SECRET is not defined in .env");
}

const port = process.env.PORT || 5000;
const host = process.env.HOST || "http://localhost:5000";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on ${host}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });