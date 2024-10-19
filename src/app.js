import express from "express";
import authRoute from "./router/auth.route.js";
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoute);

export { app };
