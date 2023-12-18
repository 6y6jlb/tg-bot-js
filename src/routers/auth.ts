import { Router } from "express";
import AuthController from "../controllers/api/AuthController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.get('/auth/logout', AuthMiddleware.verifyAccessToken, AuthController.logout);
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.store);
router.delete('/auth/:userId/password', AuthMiddleware.verifyAccessToken, AuthController.resetPassword)

export default router;