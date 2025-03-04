FROM node:20.11.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g json-server

EXPOSE 4200

CMD ["sh", "-c", "json-server --watch db.json --port 5000 & npx http-server dist/mi-app-angular -p 4200"]

