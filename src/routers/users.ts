import { Router } from "express";
import UsersController from "../controllers/api/UsersController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();


router.get('/users', AuthMiddleware.verifyAccessToken, UsersController.get);

router.put('/users', AuthMiddleware.verifyAccessToken, UsersController.update);
router.delete('/users', AuthMiddleware.verifyAccessToken, UsersController.delete);


export default router;