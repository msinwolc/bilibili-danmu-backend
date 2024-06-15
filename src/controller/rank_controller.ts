import { Request, Response } from "express";
import { getGiftIncomeByRoomidPeriod, getTotalGiftIncomeByRoomid } from "../services/gift_service";
import { getScIncomeByRoomidPeriod, getTotalScIncomByRoomid } from "../services/sc_service";
import { getAllRooms, getUpInfo } from "../services/up_service";
import { getDanmuCountByRoomid, getDanmuCountByRoomidPeriod } from "../services/danmu_service";

export async function getRankInfo(req: Request, resp: Response) {
    try {
        const rooms = await getAllRooms();

        let roomInfos = [];
        for (const room of rooms) {
            let roomid = room.roomid;
            const [giftIncome, scIncome, upInfo, danmuCount] = await Promise.all([
                getTotalGiftIncomeByRoomid(Number(roomid)),
                getTotalScIncomByRoomid(Number(roomid)),
                getUpInfo(Number(roomid)),
                getDanmuCountByRoomid(Number(roomid))
            ]);
            let roomInfo = {
                uname: upInfo.uname,
                face: upInfo.face,
                liveStatus: upInfo.live_status,
                income: Number(giftIncome) + Number(scIncome),
                giftIncome: Number(giftIncome),
                scIncome: Number(scIncome),
                danmuCount: danmuCount
            };
            roomInfos.push(roomInfo);
        }
        roomInfos.sort((a, b) => {
            if (a.income > b.income) {
                return -1;
            }
            if (a.income < b.income) {
                return 1;
            }
            return 0;
        });
        resp.json(roomInfos);
    } catch (error) {
        console.error(error);

        resp.status(500).json({
            message: 'Error!'
        })
    }

}

export async function getRankInfoByPeriod(req: Request, resp: Response) {
    try {
        const rooms = await getAllRooms();
        const period = String(req.params.period);
        let roomInfos = [];
        for (const room of rooms) {
            let roomid = Number(room.roomid);
            const [giftIncome, scIncome, upInfo, danmuCount] = await Promise.all([
                getGiftIncomeByRoomidPeriod(roomid, period),
                getScIncomeByRoomidPeriod(roomid, period),
                getUpInfo(roomid),
                getDanmuCountByRoomidPeriod(roomid, period)
            ]);
            let roomInfo = {
                uname: upInfo.uname,
                face: upInfo.face,
                liveStatus: upInfo.live_status,
                income: Number(giftIncome) + Number(scIncome),
                giftIncome: Number(giftIncome),
                scIncome: Number(scIncome),
                danmuCount: danmuCount
            };
            roomInfos.push(roomInfo);
        }
        roomInfos.sort((a, b) => {
            if (a.income > b.income) {
                return -1;
            }
            if (a.income < b.income) {
                return 1;
            }
            return 0;
        });
        resp.json(roomInfos);
    } catch (error) {
        console.error(error);

        resp.status(500).json({
            message: 'Error!'
        })
    }

}
