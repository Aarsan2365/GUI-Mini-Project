<script setup lang="ts">
import { useStore } from '../stores/mainStore';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const handleCheckout = () => {
    router.push('/checkout');
};
</script>

<template>
  <div class="min-h-screen relative bg-zinc-50 dark:bg-zinc-950 px-4 py-8 md:py-16 transition-colors duration-300">
    <div class="absolute inset-0 z-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#52525b_1px,transparent_1px)] [background-size:16px_16px]"></div>
    <div class="container relative z-10 mx-auto max-w-5xl">
        <h1 class="text-3xl font-extrabold text-zinc-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Your Cart
            <span class="text-base font-medium text-zinc-500 bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full shadow-sm">{{ store.cartCount }} Items</span>
        </h1>

        <div v-if="store.state.cart.length === 0" class="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col items-center">
            <div class="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 mb-6 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 9.2a3 3 0 0 0 0 4.2l7.4 7.4a3 3 0 0 0 4.2 0l8.6-9.2a3 3 0 0 0 0-4.2Z"/><path d="m11 11 8-8"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Your cart is empty</h3>
            <p class="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm">Looks like you haven't added anything yet. Discover our premium tech essentials to get started.</p>
            <button @click="router.push('/')" class="px-8 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold transition-all shadow-lg shadow-zinc-500/20 active:scale-95 hover:-translate-y-0.5">Start Shopping</button>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-4">
                <div v-for="item in store.state.cart" :key="item.id" class="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 sm:gap-6 group transition-all hover:shadow-md">
                    <div class="w-full sm:w-32 h-40 sm:h-32 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-3 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                        <img :src="item.thumbnail" :alt="item.title" class="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="flex-1 flex flex-col min-w-0 py-1">
                        <div class="flex justify-between items-start mb-1 gap-4">
                            <h4 class="text-xl font-bold text-zinc-900 dark:text-white line-clamp-2">{{ item.title }}</h4>
                            <button @click="store.removeFromCart(item.id)" class="text-zinc-400 hover:text-red-500 transition-colors p-2 bg-zinc-50 hover:bg-red-50 dark:bg-zinc-800 dark:hover:bg-red-900/20 rounded-full flex-shrink-0" title="Remove item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                            </button>
                        </div>
                        <p class="text-zinc-500 dark:text-zinc-400 mb-auto font-medium">LKR {{ (item.price * 300).toLocaleString() }}</p>
                        
                        <div class="flex items-center justify-between mt-4">
                            <div class="flex items-center border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl overflow-hidden p-1 shadow-inner">
                                <button @click="store.updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors shadow-sm font-medium" :disabled="item.quantity <= 1">-</button>
                                <span class="px-2 py-1 text-sm font-bold w-12 text-center text-zinc-900 dark:text-white">{{ item.quantity }}</span>
                                <button @click="store.updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors shadow-sm font-medium">+</button>
                            </div>
                            <span class="text-xl font-bold text-violet-600 dark:text-violet-400 tracking-tight">
                                LKR {{ (item.price * 300 * item.quantity).toLocaleString() }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-1">
                <div class="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-xl border border-zinc-100 dark:border-zinc-800 sticky top-28">
                    <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-6">Order Summary</h3>
                    <div class="space-y-4 mb-8">
                        <div class="flex justify-between text-zinc-500 dark:text-zinc-400">
                            <span>Subtotal ({{ store.cartCount }} items)</span>
                            <span class="font-semibold text-zinc-900 dark:text-white">LKR {{ (store.cartTotal * 300).toLocaleString() }}</span>
                        </div>
                        <div class="flex justify-between text-zinc-500 dark:text-zinc-400">
                            <span>Shipping</span>
                            <span class="text-green-600 dark:text-green-400 font-bold uppercase tracking-wider text-sm">Free</span>
                        </div>
                        <div class="pt-6 border-t border-zinc-200 dark:border-zinc-700/80 flex justify-between text-2xl font-bold text-zinc-900 dark:text-white items-end">
                            <span>Total</span>
                            <span class="tracking-tight text-violet-600 dark:text-violet-400">LKR {{ (store.cartTotal * 300).toLocaleString() }}</span>
                        </div>
                    </div>
                    <button @click="handleCheckout" class="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4.5 rounded-2xl font-bold text-lg shadow-xl shadow-zinc-900/10 dark:shadow-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                        Proceed to Checkout
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                    <p class="text-center text-xs text-zinc-400 mt-5 flex items-center justify-center gap-1.5 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        Secure checkout processing
                    </p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
