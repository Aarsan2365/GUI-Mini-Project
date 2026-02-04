import axios from 'axios';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

const api = axios.create({
    baseURL: 'https://dummyjson.com',
});

export const fetchProducts = async (limit = 20, skip = 0): Promise<Product[]> => {
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
        const response = await api.get<string[]>('/products/categories');
        // DummyJSON returns array of objects with slug, name, url OR just strings depending on endpoint version
        // Checking documentation: /products/category-list returns string[]
        return response.data;
    } catch (error) {
        // Fallback or try category-list if categories returns objects
        try {
            const listResponse = await api.get<any[]>('/products/categories');
            if (listResponse.data.length > 0 && typeof listResponse.data[0] === 'object') {
                return listResponse.data.map(c => c.slug || c.name);
            }
            return listResponse.data;
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
