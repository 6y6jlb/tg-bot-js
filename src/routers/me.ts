import { Router } from "express";
import UsersController from "../controllers/api/UsersController";
import AuthMiddleware from "../middleware/AuthMiddleware";
import MeController from "../controllers/api/MeController";

const router = Router();


router.get('/me', AuthMiddleware.verifyAccessToken, MeController.get);


export default router;