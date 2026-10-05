import { Router } from "express";
import {
    createAlertService,
    getAlertByIdService,
    getAllAlertsService,
} from "../controllers/alert.controller.js";

const router = Router();

router.get("/", getAllAlertsService);
router.get("/:id", getAlertByIdService);
router.post("/", createAlertService);

export default router;
