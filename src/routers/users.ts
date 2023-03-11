import { Router } from "express";
import UsersController from "../controllers/api/UsersController";

const router = Router();

router.get('/users/:userId',UsersController.getById);
router.get('/users',UsersController.get);

router.post('/users',UsersController.login);
router.put('/users',UsersController.update);
router.delete('/users',UsersController.delete);

router.delete('/users/:userId/password')

export default router;