import { Router } from "express";
import { getAllUsersController } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", getAllUsersController);

export default router;
