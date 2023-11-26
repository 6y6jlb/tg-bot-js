import { Router } from "express";
import UsersController from "../controllers/api/UsersController";

const router = Router();

router.get('/users/:userId',UsersController.getById);
router.get('/users',UsersController.get);

router.put('/users',UsersController.update);
router.delete('/users',UsersController.delete);

export default router;