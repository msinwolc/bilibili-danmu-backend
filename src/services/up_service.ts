import pool from "../database";
import mysql from "mysql2/promise"

export async function getLivingCount() {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM up_infos WHERE live_status = 1');
    const result = rows as mysql.RowDataPacket[]
    return result[0].count;
}

export async function getUpInfo(roomid: number) {
    const [rows] = await pool.query("SELECT uname, face, live_status FROM up_infos WHERE roomid = ?", [roomid]);
    const result = rows as mysql.RowDataPacket[];
    return {
        uname: result[0].uname,
        face: result[0].face,
        live_status: result[0].live_status,
    }
}

export async function getAllRooms() {
    const [rows] = await pool.query('SELECT DISTINCT(roomid) FROM up_infos');
    const result = rows as mysql.RowDataPacket[]
    return result
}
