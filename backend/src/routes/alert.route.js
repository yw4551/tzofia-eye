import { Router } from "express";
import {
    getAlertByIdService,
    getAllAlertsService,
} from "../controllers/alert.controller.js";

const router = Router();

router.get("/", getAllAlertsService);
router.get("/:id", getAlertByIdService);

export default router;
