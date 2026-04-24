#!/bin/sh
echo '⏳ Waiting for database...'
sleep 10

echo '📦 Running migrations...'
npx prisma migrate deploy

echo '📥 Importing data...'
mariadb -h mariadb -u root -p${MYSQL_ROOT_PASSWORD} --ssl=0 ${MYSQL_DATABASE} < /app/prisma/dane.sql 2>/dev/null || echo '⚠️ Data import done'

echo '🚀 Starting backend...'
node dist/index.js