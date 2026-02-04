<script setup lang="ts">
import type { Product } from '../services/api';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const goToDetail = () => {
  router.push({ name: 'product', params: { id: props.product.id } });
};

// Currency conversion (approximate USD to LKR)
const priceLKR = computed(() => {
  return (props.product.price * 300).toLocaleString('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
});
</script>

<template>
  <div 
    @click="goToDetail"
    class="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:-translate-y-2 cursor-pointer flex flex-col h-full relative"
  >
    <!-- Image -->
    <div class="aspect-[1/1] bg-gray-50 dark:bg-gray-700/50 relative overflow-hidden p-8 flex items-center justify-center">
       <div class="absolute inset-0 bg-radial-gradient from-white to-transparent dark:from-transparent opacity-50"></div>
      <img 
        :src="product.thumbnail" 
        :alt="product.title" 
        loading="lazy" 
        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-sm z-10"
      />
      <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg tracking-wider z-20">
        -{{ Math.round(product.discountPercentage) }}%
      </div>
    </div>

    <!-- Info -->
    <div class="p-6 flex flex-col flex-grow text-center relative z-10">
      <div class="flex items-center justify-center gap-2 mb-3">
         <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100 dark:border-emerald-900">
           {{ product.brand || product.category }}
         </span>
      </div>

      <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors h-[3rem] flex items-center justify-center">
        {{ product.title }}
      </h3>
      
      <div class="flex items-center justify-center gap-1 text-xs font-medium text-gray-400 mb-6">
         <div class="flex text-yellow-400">
           <span v-for="i in 5" :key="i" :class="i <= Math.round(product.rating) ? 'opacity-100' : 'opacity-30'">★</span>
         </div>
         <span class="ml-1 text-gray-500 dark:text-gray-400">({{ product.rating }})</span>
      </div>
      
      <div class="mt-auto pt-6 flex flex-col items-center gap-4 border-t border-gray-100 dark:border-gray-700/50 w-full">
        <div class="flex flex-col items-center">
          <span class="text-xs text-gray-400 line-through font-medium">LKR {{ ((product.price * 300) / (1 - product.discountPercentage/100)).toLocaleString('en-LK', { maximumFractionDigits: 0 }) }}</span>
          <span class="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">{{ priceLKR }}</span>
        </div>
        <button class="w-full py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-300 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm hover:shadow-emerald-500/30 font-bold tracking-wide">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
