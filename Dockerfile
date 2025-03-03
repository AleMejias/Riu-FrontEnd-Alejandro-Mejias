FROM node:20.11.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build

FROM nginx:alpine

COPY --from=build app/dist/riu-front-end-alejandro-mejias /usr/share/nginx/html

EXPOSE 4200