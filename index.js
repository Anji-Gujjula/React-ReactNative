import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Required for setting up the server
import express from 'express';
import multer from 'multer';
import { createServer } from 'react-native-express-server';
import RNFS from 'react-native-fs';

// Set up Express app and middleware
const app = express();
const upload = multer({ dest: RNFS.DocumentDirectoryPath }); // Save files to a specific directory

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    console.log('File received:', file);

    const source = `${RNFS.DocumentDirectoryPath}/${file.filename}`;
    const destination = `${RNFS.DocumentDirectoryPath}/${file.originalname}`;

    // Rename the file to its original name
    RNFS.moveFile(source, destination)
        .then(() => {
            res.status(200).send({ message: 'File saved successfully!', path: destination });
        })
        .catch((error) => {
            console.error('Error saving file:', error);
            res.status(500).send({ message: 'Error saving file', error });
        });
});

// Create and start the server
createServer(app).listen(3000, () => {
    console.log('React Native server running on port 3000');
});

AppRegistry.registerComponent(appName, () => App);
