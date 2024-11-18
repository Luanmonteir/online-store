import axios from 'axios';


const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Retorna os dados dos produtos
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};
