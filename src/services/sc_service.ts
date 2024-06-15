import pool from "../database";
import mysql from "mysql2/promise"

export async function getTotalScIncomByRoomid(roomid: number) {
    const sql = "SELECT SUM(price) AS total FROM sc_infos WHERE roomid = ?;"

    const [rows] = await pool.query(sql, [roomid]);
    const result = rows as mysql.RowDataPacket[];
    return result[0].total;
}

export async function getScIncomeByRoomidPeriod(roomid: number, period: string) {
    const sql = "SELECT SUM(price) AS total FROM sc_infos WHERE roomid = ? AND created_at >= NOW() - INTERVAL ? DAY;"

    const [rows] = await pool.query(sql, [roomid, period]);
    const result = rows as mysql.RowDataPacket[];
    return result[0].total;
}
