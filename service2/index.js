const express = require('express');
const axios = require('axios');
const sharp = require('sharp');

const app = express();
app.use(express.json());

// Endpoint pour traiter une image
app.post('/process', async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).send({ error: 'Filename is required' });
  }

  try {
    // Récupérer l'image depuis Service 1
    const response = await axios.get(`http://service1:3000/image/${filename}`, {
      responseType: 'arraybuffer' // Important pour recevoir les données sous forme de buffer
    });

    // Appliquer un flou sur l'image
    const blurredImage = await sharp(response.data).blur(10).toBuffer();

    // Retourner l'image floutée
    res.type('image/png').send(blurredImage);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to process image' });
  }
});

// Démarrage du serveur
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Service 2 running on port ${PORT}`);
});