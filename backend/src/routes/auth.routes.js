import { Router } from "express";
import {
    getAllUsersController,
    login,
    register,
    removeUser,
} from "../controllers/auth.controller.js";
import { authenticate, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", getAllUsersController);
router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate);
router.delete("/users/:id", authenticate, isAdmin, removeUser);

export default router;
