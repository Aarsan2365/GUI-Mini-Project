<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProductById, type Product } from '../services/api';

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const activeImage = ref('');

onMounted(async () => {
  const id = Number(route.params.id);
  if (!id) {
    error.value = 'Invalid product ID';
    loading.value = false;
    return;
  }

  try {
    product.value = await fetchProductById(id);
    activeImage.value = product.value.thumbnail;
  } catch (err) {
    error.value = 'Failed to load product details.';
  } finally {
    loading.value = false;
  }
});

const goBack = () => router.back();

const priceLKR = computed(() => {
  if (!product.value) return '';
  return (product.value.price * 300).toLocaleString('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
});
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-8 transition-colors duration-300">
    <div class="container mx-auto px-4 max-w-6xl">
      <button @click="goBack" class="mb-6 flex items-center gap-2 text-zinc-500 hover:text-violet-500 transition-colors font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to products
      </button>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="w-12 h-12 border-4 border-zinc-200 border-t-violet-500 rounded-full animate-spin"></div>
      </div>

      <div v-else-if="error" class="text-center text-red-500 py-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">
        {{ error }}
      </div>

      <div v-else-if="product" class="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          
          <!-- Images Section -->
          <div class="p-8 lg:p-12 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col gap-6">
            <div class="aspect-square bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center p-8 shadow-inner border border-zinc-100 dark:border-zinc-700/50">
              <img :src="activeImage" :alt="product.title" class="max-w-full max-h-full object-contain" />
            </div>
            <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                v-for="img in product.images" 
                :key="img"
                @click="activeImage = img"
                :class="['w-20 h-20 rounded-xl border-2 flex-shrink-0 overflow-hidden bg-white dark:bg-zinc-800 p-1 transition-all', activeImage === img ? 'border-violet-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100']"
              >
                <img :src="img" class="w-full h-full object-cover rounded-lg" />
              </button>
            </div>
          </div>

          <!-- Info Section -->
          <div class="p-8 lg:p-12 flex flex-col justify-center">
            <div class="flex items-center gap-3 mb-4">
               <span class="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                 {{ product.category }}
               </span>
               <span v-if="product.stock > 0" class="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1">
                 <span class="w-2 h-2 rounded-full bg-green-500"></span> In Stock
               </span>
               <span v-else class="text-red-500 text-sm font-medium">Out of Stock</span>
            </div>
            
            <h1 class="text-3xl md:text-5xl font-bold mb-4 leading-tight text-zinc-900 dark:text-white">{{ product.title }}</h1>
            
            <div class="flex items-center gap-6 mb-8 text-sm">
              <div class="flex items-center gap-1 text-amber-400">
                <span class="text-lg">★★★★★</span>
                <span class="font-bold text-zinc-700 dark:text-zinc-300 ml-1">{{ product.rating }}</span>
                 <span class="text-zinc-400">(Reviews)</span>
              </div>
              <span class="text-zinc-400">|</span>
              <span class="text-zinc-500 dark:text-zinc-400 font-medium">{{ product.brand }}</span>
            </div>

            <div class="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 mb-10 leading-relaxed text-lg">
              {{ product.description }}
            </div>

            <div class="mt-auto border-t border-zinc-100 dark:border-zinc-800 pt-10">
              <div class="flex items-end justify-between mb-8">
                <div>
                   <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1">Total Price</p>
                   <div class="flex items-baseline gap-3">
                     <span class="text-5xl font-bold text-zinc-900 dark:text-white">{{ priceLKR }}</span>
                     <span class="text-lg text-red-500 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                       -{{ Math.round(product.discountPercentage) }}%
                     </span>
                   </div>
                </div>
              </div>

              <div class="flex gap-4">
                <button class="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-4 px-8 rounded-2xl transition-all hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 text-lg">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                   Add to Cart
                </button>
                <button class="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
