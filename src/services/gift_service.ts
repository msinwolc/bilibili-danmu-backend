import pool from "../database";
import mysql from "mysql2/promise"

export async function getTotalGiftIncomeByRoomid(roomid: number) {
    const sql = `
    SELECT 
    t1.roomid, 
    SUM(t1.gift_price * t1.amount * t1.combo) / 1000 AS total
FROM 
    gift_infos t1
INNER JOIN (
    SELECT 
        gift_name, 
        MAX(combo) AS max_combo
    FROM 
        gift_infos
    WHERE 
        roomid = ?
        AND coin_type = 'gold'
    GROUP BY 
        gift_name
) t2
ON 
    t1.gift_name = t2.gift_name
    AND t1.combo = t2.max_combo
WHERE 
    t1.roomid = ?
    AND t1.coin_type = 'gold'
GROUP BY 
    t1.roomid;
    `
    const [rows] = await pool.query(sql, [roomid, roomid]);
    const result = rows as mysql.RowDataPacket[];
    return result[0].total;
}
