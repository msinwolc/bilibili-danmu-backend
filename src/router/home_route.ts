import { Router } from "express";
import { showHome } from "../controller/home_controller";

const router = Router();

router.get("/", showHome);

export default router