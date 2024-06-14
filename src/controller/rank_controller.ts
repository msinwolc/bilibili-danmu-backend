import { Request, Response } from "express";
import { getTotalGiftIncomeByRoomid } from "../services/gift_service";
import { getTotalScIncomByRoomid } from "../services/sc_service";
import { getUpInfo } from "../services/up_service";
import { getDanmuCountByRoomid } from "../services/danmu_service";

export async function getRankInfo(req: Request, resp: Response) {
    try {
        const giftIncome = await getTotalGiftIncomeByRoomid(Number(req.query['roomid']));
        const scIncome = await getTotalScIncomByRoomid(Number(req.query['roomid']));
        const upInfo  = await getUpInfo(Number(req.query['roomid']));
        const danmuCount = await getDanmuCountByRoomid(Number(req.query['roomid']));
        resp.json({
            uname: upInfo.uname,
            face: upInfo.face,
            liveStatus: upInfo.live_status,
            income: Number(giftIncome) + Number(scIncome),
            giftIncome: giftIncome,
            scIncome: scIncome,
            danmuCount: danmuCount
        })
    } catch (error) {
        console.error(error);
        
        resp.status(500).json({
            message: 'Error!'
        })
    }
    
}