FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x ./node_modules/.bin/react-scripts
RUN npm run build
