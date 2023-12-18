import { Router } from "express";
import TasksController from "../controllers/api/TasksController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.use(AuthMiddleware.verifyAccessToken)

router.get('/tasks', TasksController.get);
router.post('/tasks', TasksController.store);
router.put('/tasks', TasksController.update);
router.delete('/tasks', TasksController.delete);

export default router;