<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProducts, fetchProductsByCategory, searchProducts, type Product } from '../services/api';
import ProductCard from '../components/ProductCard.vue';
import FilterBar from '../components/FilterBar.vue';

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const route = useRoute();

const loadProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const query = route.query.q as string;
    if (query) {
      products.value = await searchProducts(query);
    } else {
      products.value = await fetchProducts(30);
    }
  } catch (err) {
    error.value = 'Failed to load products. Please try again later.';
  } finally {
    loading.value = false;
  }
};

const handleFilter = async (category: string) => {
  loading.value = true;
  error.value = null;
  try {
    if (category) {
      products.value = await fetchProductsByCategory(category);
    } else {
      await loadProducts(); 
    }
  } catch (err) {
      error.value = "Failed to filter products.";
  } finally {
      loading.value = false;
  }
};

onMounted(loadProducts);

// Watch for search query changes
watch(() => route.query.q, loadProducts);
</script>

<template>
  <div class="home-view min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
    
    <!-- Hero Section -->
    <section class="relative bg-white dark:bg-zinc-900 overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div class="absolute inset-0 z-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div class="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
            <h1 class="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
                Welcome to <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">Single Page Application</span>
            </h1>
            <p class="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-8 font-light">
                Explore our curated collection of high-quality tech essentials designed to elevate your lifestyle.
            </p>
        </div>
    </section>

    <!-- Filters -->
    <FilterBar @filter="handleFilter" />

    <div class="container mx-auto px-4 pb-20">
      
      <!-- Loading State (Skeleton Grid) -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="n in 8" :key="n" class="bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-zinc-100 dark:border-zinc-800 shadow-sm h-[400px] flex flex-col">
            <div class="w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 rounded-2xl mb-4 animate-pulse"></div>
            <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4 mb-2 animate-pulse"></div>
            <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-1/2 mb-auto animate-pulse"></div>
            <div class="flex justify-between items-center mt-4">
                <div class="h-6 bg-zinc-100 dark:bg-zinc-800 rounded w-1/3 animate-pulse"></div>
                <div class="h-10 w-10 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse"></div>
            </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        </div>
        <h3 class="text-xl font-bold text-zinc-900 dark:text-white mb-2">Oops! Something went wrong.</h3>
        <p class="text-zinc-500 dark:text-zinc-400 mb-6">{{ error }}</p>
        <button @click="loadProducts" class="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:shadow-lg transition-all">Try Again</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-20 text-center text-zinc-500">
         <div class="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
         </div>
        <p class="text-xl font-medium text-zinc-900 dark:text-white mb-1">No products found</p>
        <p class="text-sm">Try adjusting your search or filters.</p>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </div>
  </div>
</template>
