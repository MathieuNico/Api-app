FROM node:22 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

FROM base AS dev

RUN npm install -g nodemon

# Démarrer l'application avec nodemon
CMD ["npm", "run", "dev"]