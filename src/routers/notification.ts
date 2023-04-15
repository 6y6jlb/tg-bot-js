import { Router } from "express";
import NotificationController from "../controllers/api/NotificationController";

const router = Router();

router.post('/notification/:canal/send',NotificationController.send);

export default router;