
FROM node:20.11.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --configuration=production --output-hashing=none

FROM nginx:alpine

COPY --from=build /app/dist/riu-front-end-alejandro-mejias/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
