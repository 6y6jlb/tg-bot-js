import { Router } from "express";
import ExchangeController from "../controllers/api/ExchangeController";

const router = Router();

router.get('/exchange/rate',ExchangeController.get);


export default router;