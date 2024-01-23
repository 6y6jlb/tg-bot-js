import { Router } from "express";
import MeController from "../controllers/api/MeController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();


router.get('/me', AuthMiddleware.verifyAccessToken, MeController.get);
router.put('/me', AuthMiddleware.verifyAccessToken, MeController.update);


export default router;