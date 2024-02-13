import { Router } from "express";
import AuthController from "../controllers/api/AuthController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.store);
router.post('/auth/refresh_token', AuthController.refreshToken);
router.delete('/auth/logout', AuthMiddleware.verifyAccessToken, AuthController.logout);
router.delete('/auth/:userId/password', AuthMiddleware.verifyAccessToken, AuthController.resetPassword)

export default router;