import React, { useState } from 'react';
import './styles.css';
import FileUploader from './components/FileUploader';
import ApiKeyInput from './components/ApiKeyInput';
import ResultDisplay from './components/ResultDisplay';

const BACKEND_HOST = '127.0.0.1';
const BACKEND_PORT = '3001';

function App() {
  const [results, setResults] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApikeyValid, setIsApikeyValid] = useState(false);

  return (
    <div className="app">
      <h1>CHATGPT ANALYSIS</h1>
      <ApiKeyInput backendHost={BACKEND_HOST} backendPort={BACKEND_PORT} apiKey={apiKey} setApiKey={setApiKey} setIsApikeyValid={setIsApikeyValid} />
      <FileUploader
        backendHost={BACKEND_HOST}
        backendPort={BACKEND_PORT}
        setResults={setResults}
        apiKey={apiKey}
        setApiKey={setApiKey}
        setIsLoading={setIsLoading}
        isApikeyValid={isApikeyValid}
      />
      <ResultDisplay results={results} isLoading={isLoading} />
    </div>
  );
}

export default App;
