# Base image
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Exposer le port 4000
EXPOSE 4000

# Commande pour démarrer le service
CMD ["node", "index.js"]