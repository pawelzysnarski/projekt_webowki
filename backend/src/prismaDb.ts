import {PrismaClient} from "../generated/prisma/client";
import {PrismaMariaDb} from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST || 'mariadb',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword123',
    database: process.env.DB_NAME || 'chaber',
});

const prisma = new PrismaClient({ adapter });

export default prisma;