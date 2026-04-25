FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]