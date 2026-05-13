FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src
COPY tsconfig.json ./

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
