FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache mysql-client bash

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install && npm cache clean --force && npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "dev"]