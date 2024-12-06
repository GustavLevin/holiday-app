import axios from 'axios';
import { Product } from '../types/product';

const API_URL = 'http://localhost:5020/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
