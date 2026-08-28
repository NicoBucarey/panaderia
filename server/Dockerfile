FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

COPY app.js ./
COPY server.js ./
COPY seed.js ./
COPY src ./src

EXPOSE 5000

CMD ["node", "server.js"]
