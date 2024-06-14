import pool from "../database";
import mysql from "mysql2/promise"

export async function getDanmuCount() {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM danmu_infos');
    const result = rows as mysql.RowDataPacket[]
    return result[0].count;
}

export async function getDanmuCountByRoomid(roomid: number) {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM danmu_infos WHERE roomid = ?', [roomid]);
    const result = rows as mysql.RowDataPacket[]
    return result[0].count;
}