import * as fs from 'fs'
import * as path from 'path'
import {PrismaClient} from '../generated/prisma/client'
import {PrismaMariaDb} from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST || 'mariadb',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword123',
    database: process.env.DB_NAME || 'chaber',
});

const prisma = new PrismaClient({adapter})

async function main() {
    console.log('🌱 Seeding database...')

    const sqlPath = path.join(__dirname, 'dane.sql')
    console.log(`📂 Looking for: ${sqlPath}`)

    if (!fs.existsSync(sqlPath)) {
        console.log('⚠️  dane.sql not found, skipping')
        return
    }

    const sql = fs.readFileSync(sqlPath, 'utf-8')
    console.log(`📄 SQL file loaded (${sql.length} bytes)`)

    const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'))

    console.log(`📊 Found ${statements.length} statements`)

    for (let i = 0; i < statements.length; i++) {
        try {
            await prisma.$executeRawUnsafe(statements[i])
            console.log(`✅ Statement ${i + 1}/${statements.length} OK`)
        } catch (error: any) {
            if (!error.message?.includes('Duplicate') && !error.message?.includes('already exists')) {
                console.error(`❌ Error ${i + 1}: ${error.message}`)
            }
        }
    }

    console.log('✅ Seed completed!')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())