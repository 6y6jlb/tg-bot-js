import { Router } from "express";
import TasksController from "../controllers/api/TasksController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();


router.get('/tasks', AuthMiddleware.verifyAccessToken, TasksController.get);
router.post('/tasks', AuthMiddleware.verifyAccessToken, TasksController.store);
router.put('/tasks', AuthMiddleware.verifyAccessToken, TasksController.update);
router.delete('/tasks', AuthMiddleware.verifyAccessToken, TasksController.delete);

export default router;