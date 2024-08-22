// src/FileUpload.js
import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the WebSocket server

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileData = e.target.result;
        socket.emit('file-upload', { name: file.name, data: fileData });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
