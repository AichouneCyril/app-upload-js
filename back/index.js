const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

// Ajout de multer
const multer = require('multer');

// Ajout de uuid
const { v4: uuidv4 } = require('uuid');

// On définit la destination de stockage de nos fichiers
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.get('/', (req, res) => {
  res.send('test');
});
// route POST pour recevoir un fichier
app.post('/avatar', upload.single('avatar'), (req, res) => {
  console.log('test');
  // On récupère le nom du fichier
  const { originalname } = req.file;

  // On récupère le nom du fichier
  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  fs.rename(
    `uploads/${filename}`,
    `uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send('File uploaded');
    }
  );
});

app.listen(3001, 'localhost', () => {
  console.log('server');
});
