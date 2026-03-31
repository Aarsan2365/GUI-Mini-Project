import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, CartItem, User } from '../types';

export const useStore = defineStore('main', () => {
    const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
    const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
    const isAuthenticated = ref<boolean>(!!localStorage.getItem('token'));

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart.value));
    };

    const addToCart = (product: Product) => {
        const existingItem = cart.value.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.value.push({ ...product, quantity: 1 });
        }
        saveCart();
    };

    const removeFromCart = (productId: number) => {
        const index = cart.value.findIndex(item => item.id === productId);
        if (index !== -1) {
            cart.value.splice(index, 1);
            saveCart();
        }
    };

    const updateQuantity = (productId: number, quantity: number) => {
        const item = cart.value.find(item => item.id === productId);
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
        cart.value = [];
        saveCart();
    };

    const login = (userData: User) => {
        user.value = userData;
        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        user.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const cartTotal = computed(() => {
        return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    });

    const cartCount = computed(() => {
        return cart.value.reduce((count, item) => count + item.quantity, 0);
    });

    return {
        state: { cart, user, isAuthenticated },
        cart,
        user,
        isAuthenticated,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        login,
        logout,
        cartTotal,
        cartCount
    };
});
