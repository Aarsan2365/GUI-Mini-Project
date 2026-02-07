<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProducts, fetchProductsByCategory, searchProducts, type Product } from '../services/api';
import ProductCard from '../components/ProductCard.vue';
import FilterBar from '../components/FilterBar.vue';

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedProduct = ref<Product | null>(null);
const route = useRoute();

const loadProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const query = route.query.q as string;
    if (query) {
      products.value = await searchProducts(query);
    } else {
      products.value = await fetchProducts(150);
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

const openProductModal = (product: Product) => {
  selectedProduct.value = product;
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

const closeProductModal = () => {
  selectedProduct.value = null;
  document.body.style.overflow = ''; // Restore scrolling
};

onMounted(loadProducts);

// Watch for search query changes
watch(() => route.query.q, loadProducts);
</script>

<template>
  <div class="home-view min-h-screen bg-zinc-50 lg:bg-zinc-100 dark:bg-zinc-900 dark:md:bg-zinc-950 dark:lg:bg-[#808080] transition-colors duration-300">
    
    <!-- Hero Section -->
    <section class="relative bg-white dark:bg-zinc-900 overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div class="absolute inset-0 z-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#52525b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-zinc-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-zinc-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div class="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
            <h1 class="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
                Welcome to <span class="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">Aarsan store</span>
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
          @show-details="openProductModal" 
        />
      </div>
    </div>

    <!-- Product Details Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="selectedProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeProductModal"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[800px] animate-in fade-in zoom-in-95 duration-300">
            
            <!-- Close Button -->
            <button 
                @click="closeProductModal"
                class="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/50 backdrop-blur rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <!-- Image Section -->
            <div class="w-full md:w-1/2 bg-zinc-50 dark:bg-zinc-800/50 p-8 flex items-center justify-center relative">
                 <div class="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
                 <img 
                    :src="selectedProduct.thumbnail" 
                    :alt="selectedProduct.title" 
                    class="w-full h-full object-contain max-h-[400px] md:max-h-full mix-blend-multiply dark:mix-blend-normal relative z-10"
                 />
            </div>

            <!-- Details Section -->
            <div class="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div class="mb-6">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800/50 mb-4">
                        {{ selectedProduct.brand || selectedProduct.category }}
                    </span>
                    <h2 class="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4 leading-tight">
                        {{ selectedProduct.title }}
                    </h2>
                     <div class="flex items-center gap-2 mb-6">
                        <div class="flex text-amber-400 text-sm">
                            <span v-for="i in 5" :key="i" class="drop-shadow-sm">{{ i <= Math.round(selectedProduct.rating) ? '★' : '☆' }}</span>
                        </div>
                        <span class="text-sm font-medium text-zinc-500 dark:text-zinc-400">({{ selectedProduct.rating }} Rating)</span>
                    </div>
                </div>

                <div class="space-y-6">
                    <p class="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        {{ selectedProduct.description }}
                    </p>

                    <div class="flex flex-col gap-1 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <span class="text-sm text-zinc-500 line-through">LKR {{ ((selectedProduct.price * 300) / (1 - selectedProduct.discountPercentage/100)).toLocaleString('en-LK', { maximumFractionDigits: 0 }) }}</span>
                        <div class="flex items-baseline gap-3">
                            <span class="text-4xl font-bold text-zinc-900 dark:text-white">
                                {{ (selectedProduct.price * 300).toLocaleString('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                            </span>
                            <span class="text-sm font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-md">
                                {{ Math.round(selectedProduct.discountPercentage) }}% OFF
                            </span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800">
                            <span class="block text-zinc-500 dark:text-zinc-400 mb-1">Category</span>
                            <span class="font-semibold text-zinc-900 dark:text-white capitalize">{{ selectedProduct.category }}</span>
                        </div>
                         <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800">
                            <span class="block text-zinc-500 dark:text-zinc-400 mb-1">Stock</span>
                            <span class="font-semibold text-zinc-900 dark:text-white">{{ selectedProduct.stock }} Units</span>
                        </div>
                    </div>

                    <button class="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-zinc-500/20 transition-all active:scale-[0.98]">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
