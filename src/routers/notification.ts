import { Router } from "express";
import NotificationController from "../controllers/api/NotificationController";

const router = Router();

router.get('/notification/:canal/send',NotificationController.send);

export default router;