import mysql from 'mysql2/promise'
import { env } from '../config/config';

const pool = mysql.createPool({
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWD,
    database: env.MYSQL_DATABASE,
    connectionLimit: 151,
});

export default pool