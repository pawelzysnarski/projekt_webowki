FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd bash mysql-client

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

RUN mkdir -p scripts && chmod +x scripts/*.sh 2>/dev/null || true

EXPOSE 3000

CMD ["npm", "run", "dev"]