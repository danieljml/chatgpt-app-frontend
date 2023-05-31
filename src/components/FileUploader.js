import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import analyzeDocument from '../api/analyzeDocument';

function FileUploader({ backendHost, backendPort, setResults, apiKey, setIsLoading, isApikeyValid }) {
  const [csvFile, setCsvFile] = useState(null);
  const [isFileValid, setIsFileValid] = useState('');

  const handleDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      setIsFileValid('');
    } else {
      setCsvFile(null);
      setIsFileValid('Please select a valid CSV file.');
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!csvFile) {
      return;
    }
    setIsLoading(true);
    try {
      const result = await analyzeDocument(backendHost, backendPort, csvFile, apiKey);
      setResults(result);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              border: '1px dashed black',
              padding: '1rem',
              marginTop: '1rem',
            }}
          >
            <input {...getInputProps()} />
            <p>Drag and drop a CSV file here, or click to select a file</p>
            {csvFile && <p>Selected file: {csvFile.name}</p>}
          </div>
        )}
      </Dropzone>
      <button type="submit" disabled={!csvFile || !isApikeyValid}>
        Interpret
      </button>
      {isFileValid && <p style={{ color: 'red' }}>{isFileValid}</p>}
    </form>
  );
}

export default FileUploader;
