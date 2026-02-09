<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchCategories } from '../services/api';

const categories = ref<string[]>([]);
const selectedCategory = ref('');

const emit = defineEmits<{
  (e: 'filter', category: string): void;
}>();

onMounted(async () => {
  const allCategories = await fetchCategories();
  console.log('Total categories fetched:', allCategories.length);
  categories.value = allCategories.slice(0, 10);
  console.log('Categories displayed:', categories.value.length);
});

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  emit('filter', category);
};
</script>

<template>
  <div class="filter-bar py-4 transition-all duration-300">
    <div class="container mx-auto px-4">
        <!-- Scrollable Container -->
        <div class="">
          <div class="flex flex-wrap gap-3 justify-center">
            <button 
              @click="selectCategory('')"
              :class="[
                'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border',
                selectedCategory === '' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg shadow-zinc-900/20 dark:shadow-white/10 border-transparent hover:-translate-y-0.5' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-sm'
              ]"
            >
              All Products
            </button>
            
            <button 
              v-for="category in categories" 
              :key="category"
              @click="selectCategory(category)"
              :class="[
                'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border capitalize',
                selectedCategory === category 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg shadow-zinc-900/20 dark:shadow-white/10 border-transparent hover:-translate-y-0.5' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-sm'
              ]"
            >
              {{ category.replace('-', ' ') }}
            </button>
          </div>
        </div>
    </div>
  </div>
</template>
