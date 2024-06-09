import axios from 'axios';

type HttpClient = {
  get: (url: string) => Promise<any>;
};

const httpClient: HttpClient = {
  get: async (url: string) => {
    console.log(`Making request to ${url} with axios`);
    try {
      const response = await axios.get(url);
      console.log('Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del servicio externo con axios:', error);
      throw new Error('Error al obtener datos del servicio externo con axios');
    }
  }
};


export default httpClient;