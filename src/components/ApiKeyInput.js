import React, { useState } from 'react';
import validateCredentials from '../api/validateCredentials';

function ApiKeyInput({ backendHost, backendPort, apiKey, setApiKey, setIsApikeyValid }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleApiKeyChange = event => {
    setApiKey(event.target.value);
    setErrorMessage('');
    setSuccessMessage('');
    setIsApikeyValid(false);
  };

  const handleValidateApiKey = async () => {
    if (!apiKey || !apiKey.trim()) {
      setErrorMessage('Add a valid API key');
      setIsApikeyValid(false);
      return;
    }
    try {
      const result = await validateCredentials(backendHost, backendPort, apiKey);
      setSuccessMessage(result);
      setIsApikeyValid(true);
    } catch (error) {
      setIsApikeyValid(false);
      setErrorMessage(error?.response?.data.error?.message);
    }
  };

  return (
    <div>
      <label>
        API Key: <input type="text" value={apiKey} onChange={handleApiKeyChange} />
      </label>
      <button type="button" onClick={handleValidateApiKey}>
        Validate
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default ApiKeyInput;
