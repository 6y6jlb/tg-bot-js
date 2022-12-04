import { Router } from "express";
import WeatherController from "../controllers/api/WeatherController";

const router = Router();

router.get('/weather',WeatherController.get);

export default router;