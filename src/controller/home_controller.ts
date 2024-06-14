import { Request, Response } from "express";
import { getDanmuCount } from "../services/danmu_service";
import { getLivingCount } from "../services/up_service";

export async function showHome(req: Request, resp: Response) {
    try {
        const danmuCount = await getDanmuCount();
        const livingCount = await getLivingCount();
        resp.json({
            danmuCount: danmuCount,
            livingCount: livingCount,
        })
    } catch (error) {
        console.error(error);
        
        resp.status(500).json({
            message: 'Error!'
        })
    }
}