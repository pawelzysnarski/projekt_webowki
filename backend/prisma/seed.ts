import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function createCrudUser() {
    console.log('👤 Tworzenie użytkownika CRUD...')

    try {
        // Sprawdź czy użytkownik istnieje
        const users = await prisma.$queryRaw`
      SELECT user FROM mysql.user WHERE user = 'crud_user'
    ` as any[]

        if (users.length === 0) {
            await prisma.$executeRaw`CREATE USER 'crud_user'@'%' IDENTIFIED BY 'CrudPass123!'`
            await prisma.$executeRaw`CREATE USER 'crud_user'@'localhost' IDENTIFIED BY 'CrudPass123!'`
            console.log('✅ Użytkownik crud_user utworzony')
        } else {
            console.log('✅ Użytkownik crud_user już istnieje')
        }

        await prisma.$executeRaw`GRANT SELECT, INSERT, UPDATE, DELETE ON chaber.* TO 'crud_user'@'%'`
        await prisma.$executeRaw`GRANT SELECT, INSERT, UPDATE, DELETE ON chaber.* TO 'crud_user'@'localhost'`
        await prisma.$executeRaw`FLUSH PRIVILEGES`

        console.log('✅ Uprawnienia CRUD nadane')
    } catch (error) {
        console.error('❌ Błąd tworzenia użytkownika CRUD:', error)
    }
}

async function loadDaneSql() {
    const sqlPath = path.join(__dirname, 'dane.sql')

    if (!fs.existsSync(sqlPath)) {
        console.log('⚠️  Plik dane.sql nie istnieje, pomijam')
        return
    }

    console.log('📄 Wykonywanie dane.sql...')
    const sql = fs.readFileSync(sqlPath, 'utf-8')

    const queries = sql
        .split(';')
        .map(q => q.trim())
        .filter(q => q.length > 0 && !q.startsWith('--')) // Pomijaj komentarze

    console.log(`📊 Znaleziono ${queries.length} zapytań`)

    for (let i = 0; i < queries.length; i++) {
        try {
            await prisma.$executeRawUnsafe(queries[i])
            console.log(`✅ Zapytanie ${i + 1}/${queries.length} wykonane`)
        } catch (error) {
            console.error(`❌ Błąd w zapytaniu ${i + 1}:`, error.message)
        }
    }
}

async function main() {
    console.log('🌱 Rozpoczynanie inicjalizacji bazy danych...')

    await createCrudUser()
    await loadDaneSql()

    console.log('✅ Inicjalizacja zakończona!')
}

main()
    .catch((e) => console.error('❌ Błąd:', e))
    .finally(async () => await prisma.$disconnect())