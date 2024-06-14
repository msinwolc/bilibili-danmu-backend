import dotenv from 'dotenv'

dotenv.config()

interface Env {
    MYSQL_HOST?: string,
    MYSQL_USER?: string,
    MYSQL_PASSWD?: string,
    MYSQL_DATABASE?: string,
}

const getEnv = (): Env => {
    return {
        MYSQL_HOST: process.env.host,
        MYSQL_USER: process.env.user,
        MYSQL_PASSWD: process.env.password,
        MYSQL_DATABASE: process.env.database,
    };
};

export const env = getEnv();