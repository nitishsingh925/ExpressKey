// auth route
import { Router } from "express";
import { signIn, signOut, signUp } from "../controller/auth.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", AuthMiddleware, signOut);

export default router;
