import { Router } from "express";
import { getRankInfo, getRankInfoByPeriod } from "../controller/rank_controller"

const router = Router();

router.get("/", getRankInfo);
router.get("/period/:period", getRankInfoByPeriod);

export default router