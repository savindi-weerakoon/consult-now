# services/user-profile-service/Dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4002

CMD ["node", "index.js"]
