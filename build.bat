@echo off
echo 📦 Budowanie frontendu...
cd frontend
call npm run build
cd ..

echo 🐳 Uruchamianie środowiska produkcyjnego...
docker-compose -f docker-compose.prod.yml up -d --build

echo ✅ Aplikacja działa na http://localhost
echo 📋 Logi: docker-compose -f docker-compose.prod.yml logs -f