// server.js
import { ExpoConfigView } from '@expo/samples';
import { NativeModules } from 'react-native';
import * as FileSystem from 'expo-file-system';
import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FileSystem.documentDirectory); // Save file to app's document directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ message: 'File received and saved!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
