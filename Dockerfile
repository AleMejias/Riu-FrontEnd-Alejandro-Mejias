# Etapa 1: Construcción de Angular
FROM node:20.11.1 AS build

WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación Angular
COPY . .

# Ejecutar la construcción de Angular (con optimización para producción)
RUN npm run build --configuration=production --output-hashing=none

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos construidos de Angular a la carpeta de Nginx
COPY --from=build /app/dist/riu-front-end-alejandro-mejias/browser /usr/share/nginx/html

# Copiar el archivo nginx.conf personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 (Nginx escucha en el puerto 80 dentro del contenedor)
EXPOSE 4200

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
