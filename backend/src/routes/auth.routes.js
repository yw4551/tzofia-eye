import { Router } from "express";
import {
    getAllUsersController,
    login,
    register,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getAllUsersController);
router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate);

export default router;
