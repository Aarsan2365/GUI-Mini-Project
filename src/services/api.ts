import axios from 'axios';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get<Product[]>('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
