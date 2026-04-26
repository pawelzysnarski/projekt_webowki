import {PrismaClient} from "../generated/prisma/client.js";
import {PrismaMariaDb} from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'chaber',
});

const prisma = new PrismaClient({ adapter });

export default prisma;