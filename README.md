# Projet Backend - Architecture Microservices

## Table des matières
- [Description du projet](#description-du-projet)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement des services](#lancement-des-services)
- [Endpoints](#endpoints)
    - [Service 1: Téléchargement d'image](#service-1-téléchargement-dimage)
    - [Service 2: Traitement d'image](#service-2-traitement-dimage)
- [Exemples de requêtes](#exemples-de-requêtes)
- [Tests](#tests)
- [Collection Postman](#collection-postman)
- [Prochaines étapes](#prochaines-étapes)
- [Auteur](#auteur)

---

## Description du projet

Ce projet est une preuve de concept d'une architecture microservices. Il comprend deux services :

1. **Service 1 : Téléchargement d'image**  
   Responsable de la gestion d'un cache local d'images.

2. **Service 2 : Traitement d'image**  
   Permet d'appliquer un floutage sur une image récupérée depuis le cache du Service 1.

Les deux services communiquent via HTTP et sont déployés à l'aide de Docker.

---

## Architecture

L'architecture se compose de deux services :

- **Service 1** : Gère le téléchargement et le stockage d'images.
- **Service 2** : Récupère les images du Service 1, applique un floutage, puis retourne l'image modifiée.

Les deux services sont conteneurisés à l'aide de Docker et orchestrés avec `docker-compose` :

[ Client ]  —>  [ Service 2 ]  —>  [ Service 1 ]

---

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/)

---

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <URL_DU_DEPOT>
   cd damae-backend-test
   ```
   
2. Construisez les images Docker :
   ```bash
   make build
    ```
   
---

## Lancement des services

Pour démarrer les services :
```bash
make up
```

Les services seront accessibles via les ports suivants :
- **Service 1** : [http://localhost:3000](http://localhost:3000)
- **Service 2** : [http://localhost:4000](http://localhost:4000)

Pour arrêter les services :
```bash
make down
```

---

## Endpoints

### Service 1: Téléchargement d'image

- **POST** `/upload`
    - Description : Upload une image.
    - Requête :
        - Paramètre de formulaire : `image` (fichier)
    - Réponse :
      ```json
      {
        "message": "Image uploaded successfully",
        "filename": "1698761234-myimage.jpg"
      }
      ```

- **GET** `/image/:filename`
    - Description : Récupère une image stockée dans le cache.
    - Paramètre :
        - `filename` : Nom du fichier image.
    - Réponse : Fichier image.

---

### Service 2: Traitement d'image

- **POST** `/process`
    - Description : Applique un floutage sur une image.
    - Requête :
      ```json
      {
        "filename": "1698761234-myimage.jpg"
      }
      ```
    - Réponse : Image floutée (format PNG).

---

## Exemples de requêtes

### Requêtes avec `curl`

#### 1. Upload d'une image via Service 1
```bash
curl -X POST -F "image=@path_to_image.jpg" http://localhost:3000/upload
```

#### 2. Récupération d'une image via Service 1
```bash
curl http://localhost:3000/image/<filename> --output original_image.jpg
```

#### 3. Floutage d'une image via Service 2
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"filename": "your_uploaded_image_filename"}' \
http://localhost:4000/process --output blurred_image.png
```

---

## Tests

Après avoir lancé les services, vous pouvez tester les fonctionnalités en utilisant :
- [Postman](https://www.postman.com/) : pour des requêtes HTTP interactives.
- `curl` : pour des tests rapides en ligne de commande.

### Vérification des logs
Utilisez Docker pour vérifier les logs :
```bash
docker-compose logs
```

---

## Collection Postman

### Description

La collection Postman inclut les différents endpoints pour tester les services. Vous pouvez importer cette collection pour faciliter les tests.

### Instructions pour l'importation

1. Téléchargez [ce fichier JSON](collection_postman.json) contenant la collection.
2. Ouvrez Postman.
3. Cliquez sur **Import** > **Upload Files**.
4. Sélectionnez le fichier `collection_postman.json`.
5. Une fois importée, utilisez les requêtes pour tester les endpoints.

### Contenu de la collection

La collection inclut :
- **Service 1 - Upload Image** : Endpoint pour uploader une image.
- **Service 1 - Get Image** : Endpoint pour récupérer une image.
- **Service 2 - Process Image (Blur)** : Endpoint pour flouter une image.

---

## Prochaines étapes

Quelques améliorations possibles :
- **Gestion des erreurs** : Ajouter des vérifications plus robustes pour gérer les fichiers manquants ou les formats non supportés.
- **Tests unitaires et d'intégration** : Utiliser des frameworks comme `Jest` ou `Mocha` pour tester les services.
- **Mécanisme de persistance avancée** : Intégrer une base de données ou un stockage cloud pour les images.

---

## Auteur

- **Remi Puccinelli**
- Email : [remi.puccinelli@gmail.com](mailto:remi.puccinelli@gmail.com)

---