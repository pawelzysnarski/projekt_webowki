#!/bin/sh
set -e

echo "🔄 Oczekiwanie na gotowość bazy danych..."
while ! nc -z mariadb 3306; do
  sleep 2
done

echo "✅ Baza danych jest gotowa!"

echo "📦 Uruchamianie migracji Prisma..."
npx prisma migrate deploy

echo "🌱 Wykonywanie seedowania z pliku /prisma/dane.sql..."
npx prisma db seed

echo "✨ Inicjalizacja zakończona!"