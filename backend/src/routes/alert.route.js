import { Router } from "express";
import {
    createAlertService,
    deleteAlertService,
    getAlertByIdService,
    getAllAlertsService,
} from "../controllers/alert.controller.js";

const router = Router();

router.get("/", getAllAlertsService);
router.get("/:id", getAlertByIdService);
router.post("/", createAlertService);
router.delete("/:id", deleteAlertService);

export default router;
