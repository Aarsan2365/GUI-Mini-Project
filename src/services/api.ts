import axios from 'axios';
import type { Product } from '../types';

interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

const api = axios.create({
    baseURL: 'https://dummyjson.com',
});

export const fetchProducts = async (limit = 100, skip = 0): Promise<Product[]> => {
    try {
        const response = await api.get<ProductResponse>(`/products?limit=${limit}&skip=${skip}`);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductById = async (id: number): Promise<Product> => {
    try {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const response = await api.get<ProductResponse>(`/products/search?q=${query}`);
        return response.data.products;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

export const fetchCategories = async (): Promise<string[]> => {
    try {
        // Use category-list endpoint which returns string[]
        const response = await api.get<string[]>('/products/category-list');
        return response.data;
    } catch (error) {
        try {
            const listResponse = await api.get<unknown[]>('/products/categories');
            if (Array.isArray(listResponse.data) && listResponse.data.length > 0) {
                const firstItem = listResponse.data[0];
                if (typeof firstItem === 'object' && firstItem !== null) {
                    const typedList = listResponse.data as { slug?: string, name?: string }[];
                    return typedList.map(c => c.slug || c.name || '');
                }
            }
            return listResponse.data as string[];
        } catch (e) {
            console.error('Error fetching categories:', e);
            return [];
        }
    }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await api.get<ProductResponse>(`/products/category/${category}`);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching category products:', error);
        throw error;
    }
}
