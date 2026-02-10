import { reactive, computed } from 'vue';
import type { Product, CartItem, User } from '../types';

interface State {
    cart: CartItem[];
    user: User | null;
    isAuthenticated: boolean;
}

const state = reactive<State>({
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('token'),
});

// Cart Actions
const addToCart = (product: Product) => {
    const existingItem = state.cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }
    saveCart();
};

const removeFromCart = (productId: number) => {
    const index = state.cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        state.cart.splice(index, 1);
        saveCart();
    }
};

const updateQuantity = (productId: number, quantity: number) => {
    const item = state.cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
        }
    }
};

const clearCart = () => {
    state.cart = [];
    saveCart();
};

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
};

// Auth Actions
const login = (userData: User) => {
    state.user = userData;
    state.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
};

const logout = () => {
    state.user = null;
    state.isAuthenticated = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

// Getters
const cartTotal = computed(() => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const cartCount = computed(() => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
});

export const useStore = () => ({
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    login,
    logout,
    cartTotal,
    cartCount
});
