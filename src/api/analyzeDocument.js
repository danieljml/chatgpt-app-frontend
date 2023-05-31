import axios from 'axios';

async function analyzeDocument(backendHost, backendPort, csvFile, apiKey) {
  const formData = new FormData();
  formData.append('document', csvFile);

  try {
    const response = await axios.post(`http://${backendHost}:${backendPort}/analyze_document/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: apiKey,
      },
    });
    return response?.data?.response?.message;
  } catch (error) {
    throw error
  }
}

export default analyzeDocument;
