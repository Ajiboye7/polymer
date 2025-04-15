import express from "express";
import UserRoute from "../src/routes/UserRoute";
import path from "path";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", UserRoute);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default app;
