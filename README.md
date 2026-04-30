# ⚽ Chaber Pobiedziska - aplikacja webowa
 
Webowa aplikacja klubu piłkarskiego umożliwiająca zakup biletów i karnetów, przeglądanie sklepu, aktualności, terminarza oraz zapisy do akademii.
 
**Stack:** React + TypeScript · Node.js + Express · Prisma · MariaDB · Docker
 
## Szybki start
 
```bash
# Development
docker compose up --build -d
 
# Produkcja
docker compose -f docker-compose.prod.yml up --build -d
```
 
## Testy
 
```bash
docker exec backend npm test
docker exec frontend npm test
```
 
## Dokumentacja
 
- 📘 [Dokumentacja techniczna](docs/Dokumentacja.md)
- 🧪 [Sprawozdanie z testów](docs/Sprawozdanie-testy.md)
