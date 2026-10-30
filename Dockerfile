FROM node:22-alpine

WORKDIR /app

# Copiamos primero los archivos de dependencias para aprovechar la caché de Docker
COPY package*.json ./

RUN npm install

# Copiamos el resto de la configuración y el código
COPY tsconfig.json eslint.config.mjs ./
COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "dev"]