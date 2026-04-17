<script setup lang="ts">
import { useStore } from '../stores/mainStore';
import ProductCard from '../components/ProductCard.vue';
import { RouterLink } from 'vue-router';

const store = useStore();
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-zinc-900 dark:text-white mb-8">My Wishlist</h1>
        
        <!-- Empty State -->
        <div v-if="store.wishlist.length === 0" class="flex flex-col items-center justify-center bg-white dark:bg-zinc-900 rounded-3xl p-12 py-24 border border-zinc-100 dark:border-zinc-800 shadow-sm text-center">
            <div class="w-24 h-24 bg-pink-50 dark:bg-pink-900/20 text-pink-500 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h2 class="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Your wishlist is empty</h2>
            <p class="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-8">
                Explore our collection and add some items you love to your wishlist.
            </p>
            <RouterLink 
                to="/"
                class="px-8 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
                Browse Products
            </RouterLink>
        </div>

        <!-- Wishlist Items -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard 
                v-for="product in store.wishlist" 
                :key="product.id" 
                :product="product" 
            />
        </div>
      </div>
    </div>
  </div>
</template>
