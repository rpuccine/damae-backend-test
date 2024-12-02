# Base image
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer le service
CMD ["node", "index.js"]