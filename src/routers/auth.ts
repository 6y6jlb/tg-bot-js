import { Router } from "express";
import AuthController from "../controllers/api/AuthController";

const router = Router();

router.get('/auth/logout', AuthController.logout);
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.store);
router.delete('/auth/:userId/password', AuthController.resetPassword)

export default router;