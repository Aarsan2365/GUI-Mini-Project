<script setup lang="ts">
import type { Product } from '../types';
import { computed } from 'vue';

const props = defineProps<{
  product: Product;
}>();

const priceLKR = computed(() => {
  return (props.product.price * 300).toLocaleString('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
});

const originalPriceLKR = computed(() => {
    return ((props.product.price * 300) / (1 - props.product.discountPercentage/100)).toLocaleString('en-LK', { maximumFractionDigits: 0 });
});

import { useStore } from '../stores/mainStore';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const handleCardClick = () => {
  router.push(`/product/${props.product.id}`);
};

const handleAddToCart = () => {
  store.addToCart(props.product);
  router.push('/addtocart');
};
</script>

<template>
  <div 
    class="group relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-900/10 dark:hover:shadow-black/50 isolate"
  >
    <!-- Link Overlay -->
    <!-- Link Overlay (Removed for Modal) -->
    <!-- Link Overlay (Removed for Modal) -->
    <div 
      class="absolute inset-0 z-10 cursor-pointer"
      @click="handleCardClick"
      aria-label="View product details"
    >
        <span class="sr-only">View {{ product.title }}</span>
    </div>
    <!-- Discount Badge -->
    <div class="absolute top-4 left-4 z-20">
        <div class="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-red-500/20 tracking-wider">
            -{{ Math.round(product.discountPercentage) }}%
        </div>
    </div>

    <!-- Wishlist Button Overlay -->
    <button
      @click.stop.prevent="store.toggleWishlist(product)"
      class="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-pink-500 transition-all duration-300 shadow-sm hover:scale-110 active:scale-95"
      :class="{ 'text-pink-500 bg-pink-50 dark:bg-pink-900/20': store.isInWishlist(product.id) }"
      type="button"
      :title="store.isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" :fill="store.isInWishlist(product.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    </button>

    <!-- Image Container with Hover Overlay -->
    <div class="relative w-full aspect-[4/3] bg-zinc-50 dark:bg-zinc-800/50 overflow-hidden p-6 flex items-center justify-center">
        <!-- Shine effect removed -->
      
      <img 
        :src="product.thumbnail" 
        :alt="product.title" 
        loading="lazy" 
        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform mix-blend-multiply dark:mix-blend-normal"
      />
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-grow relative">
      <div class="mb-2">
         <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800/50">
           {{ product.brand || product.category }}
         </span>
      </div>

      <h3 class="font-bold text-base text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-relaxed mb-1 transition-colors">
        {{ product.title }}
      </h3>
      
      <div class="flex items-center gap-1.5 mb-4">
         <div class="flex text-amber-400 text-xs">
           <span v-for="i in 5" :key="i" class="drop-shadow-sm">{{ i <= Math.round(product.rating) ? '★' : '☆' }}</span>
         </div>
         <span class="text-xs font-medium text-zinc-400">({{ product.rating }})</span>
      </div>
      
      <div class="mt-auto flex items-end justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <div class="flex flex-col">
          <span class="text-xs text-zinc-400 line-through font-medium mb-0.5">LKR {{ originalPriceLKR }}</span>
          <span class="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">{{ priceLKR }}</span>
        </div>
        
        <button 
          @click.stop="handleAddToCart"
          class="relative z-20 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-violet-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-violet-500/40 hover:scale-105 active:scale-95"
          title="Add to Cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>
