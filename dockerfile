# ETAPA 1: Construcción
FROM node:lts-alpine AS build
WORKDIR /app

# Instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código y generamos el build
COPY . .
RUN npm run build

# ETAPA 2: Servidor Web
FROM nginx:stable-alpine

# Borramos los archivos por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# COPIA CRÍTICA: Ajustada para versiones modernas de Angular
# Nota: Si tu proyecto tiene un nombre distinto en angular.json, 
# el asterisco (*) lo encontrará automáticamente.
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

# Copiamos la configuración de Nginx (paso siguiente)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]