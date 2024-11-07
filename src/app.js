import express from "express";
import authRoute from "./router/auth.route.js";
import homeRoute from "./router/home.route.js";
import cookieParser from "cookie-parser";
import AuthMiddleware from "./middlewares/auth.middleware.js";
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Not Protected Route
app.use("/api/v1/auth", authRoute);

// Protected Route
app.use("/api/v1/home", AuthMiddleware, homeRoute);

export { app };
