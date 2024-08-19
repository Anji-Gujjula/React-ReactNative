// App.js
import React, { useEffect } from 'react';
import { SafeAreaView, Button, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import HttpServer from 'react-native-http-server';

const App = () => {
  useEffect(() => {
    // Start HTTP server
    const server = new HttpServer({
      port: 8080, // You can change this to any available port
      onRequest: handleRequest,
    });

    server.start().then(() => {
      console.log('HTTP Server started');
    });

    return () => {
      server.stop();
    };
  }, []);

  const handleRequest = async (req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
      const filePath = `${RNFS.DocumentDirectoryPath}/uploadedFile`;

      req.pipe(RNFS.createWriteStream(filePath));

      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded successfully');
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  };

  const handleTestFileUpload = () => {
    Alert.alert('Test', 'File upload works only through web app, make sure your web app is correctly sending the file.');
  };

  return (
    <SafeAreaView>
      <Button title="Test File Upload" onPress={handleTestFileUpload} />
    </SafeAreaView>
  );
};

export default App;
