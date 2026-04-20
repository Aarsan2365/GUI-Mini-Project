import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/product/:id',
            name: 'product',
            component: () => import('../views/ProductDetailView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/addtocart',
            name: 'cart',
            component: () => import('../views/CartView.vue'),
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: () => import('../views/WishlistView.vue'),
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: () => import('../views/CheckoutView.vue'),
            meta: { requiresAuth: true }
        },
    ],
});

router.beforeEach((to, _from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (to.meta.requiresAuth && !isAuthenticated) {
        // Redirect to login if user is not authenticated and trying to access a protected route
        next('/login');
    } else {
        next();
    }
});

export default router;
