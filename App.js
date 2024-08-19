// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileSave = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Send file to React Native app
      await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  };

  const handleFileOpen = async () => {
    // Fetch the file content from React Native app
    const response = await axios.get('http://localhost:4000/file-content');
    setFileContent(response.data);
  };

  return (
    <div className="App">
      <h1>React Web App</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileSave}>Save File</button>
      <button onClick={handleFileOpen}>Open Saved File</button>

      {fileContent && (
        <div>
          <h2>File Content:</h2>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
