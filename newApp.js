// App.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const App = () => {
  const [fileUri, setFileUri] = React.useState(null);

  const fetchFile = async () => {
    try {
      const response = await axios.get('http://<YOUR_REACT_NATIVE_SERVER_URL>:<PORT>/fetch-file', { responseType: 'arraybuffer' });
      const filePath = FileSystem.documentDirectory + 'downloaded-file';
      await FileSystem.writeAsStringAsync(filePath, response.data, { encoding: FileSystem.EncodingType.Base64 });
      setFileUri(filePath);
      console.log('File saved to:', filePath);
    } catch (error) {
      console.error('Error fetching file', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native File Receiver</Text>
      <Button title="Fetch File" onPress={fetchFile} />
    </View>
  );
};

export default App;
