FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

RUN npm i -g serve

WORKDIR /app

COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist"]