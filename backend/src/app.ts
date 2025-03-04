import express from "express";
import UserRoute from "../src/routes/UserRoute";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", UserRoute);

export default app;
