const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Configuration de multer pour enregistrer les images dans un dossier "cache"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'cache');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir); // Créer le dossier s'il n'existe pas
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Endpoint pour uploader une image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No image uploaded' });
  }
  res.send({
    message: 'Image uploaded successfully',
    filename: req.file.filename
  });
});

// Endpoint pour récupérer une image
app.get('/image/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'cache', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: 'Image not found' });
  }
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Service 1 running on port ${PORT}`);
});