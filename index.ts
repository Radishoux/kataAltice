// Importer express et multer
import express, { Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
// Importer mongoose
import mongoose from 'mongoose';


// Créer une instance de l'application Express
const app = express();
// ...


// Configurer Multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accepter seulement les fichiers .png, .jpg et .jpeg
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
// ...
// Créer un middleware Multer
const uploadMiddleware = upload.single('file');

// Ajouter un nouvel endpoint POST
app.post('/api/media/upload', uploadMiddleware, (req: Request, res: Response) => {
  // req.file contient les informations sur le fichier téléchargé
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  return res.status(200).send(`File uploaded: ${req.file.originalname}`);
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});