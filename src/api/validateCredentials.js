import axios from 'axios';

async function validateCredentials(backendHost, backendPort, apiKey) {
  try {
    const response = await axios.post(
      `http://${backendHost}:${backendPort}/validate_credentials/`,
      {
        apiKey,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    return response?.data?.response?.message;
  } catch (error) {
    throw error;
  }
}

export default validateCredentials;
