import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.AZURE_API_KEY,
    'azureml-model-deployment': 'navigator-ml-hxppf-1',
  },
});

export default instance;
