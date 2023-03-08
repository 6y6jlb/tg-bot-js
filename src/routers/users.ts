import { Router } from "express";
import UsersController from "../controllers/api/UsersController";

const router = Router();

router.get('/users',UsersController.get);
router.post('/users',UsersController.login);
router.put('/users',UsersController.update);
router.delete('/users',UsersController.delete);

export default router;