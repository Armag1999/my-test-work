import axios from 'axios';
import { apiKey } from '../config';

const BASE_URL = 'https://cloud.iexapis.com/stable';

const getStocks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stock/market/list/mostactive`, {
      params: {
        token: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

export default getStocks;
