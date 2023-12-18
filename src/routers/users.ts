import { Router } from "express";
import UsersController from "../controllers/api/UsersController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.use(AuthMiddleware.verifyAccessToken)

router.get('/users/:userId', UsersController.getById);
router.get('/users', UsersController.get);

router.put('/users', UsersController.update);
router.delete('/users', UsersController.delete);


export default router;