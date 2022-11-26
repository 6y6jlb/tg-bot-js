import { Router } from "express";
import TasksController from "../controllers/api/TasksController";

const router = Router();

router.get('/tasks',TasksController.get);
router.post('/tasks',TasksController.store);
router.put('/tasks',TasksController.update);
router.delete('/tasks',TasksController.delete);

export default router;