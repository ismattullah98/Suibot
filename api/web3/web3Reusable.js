const axios = require('axios');

async function sendPostRequest(url, requestData) {
  try {
    const response = await axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  sendPostRequest
};
