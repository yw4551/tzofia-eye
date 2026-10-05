import { Router } from "express";
import { getAllAlertsService } from "../controllers/alert.controller.js";

const router = Router();

router.get("/", getAllAlertsService);

export default router;
