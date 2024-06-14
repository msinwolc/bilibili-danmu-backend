import { Router } from "express";
import { getRankInfo } from "../controller/rank_controller"

const router = Router();

router.get("/", getRankInfo);

export default router