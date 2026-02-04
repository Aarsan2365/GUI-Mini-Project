<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchCategories } from '../services/api';

const categories = ref<string[]>([]);
const selectedCategory = ref('');

const emit = defineEmits<{
  (e: 'filter', category: string): void;
}>();

onMounted(async () => {
  categories.value = await fetchCategories();
});

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  emit('filter', category);
};
</script>

<template>
  <div class="filter-bar py-4 overflow-x-auto whitespace-nowrap bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-6">
    <div class="container mx-auto px-4 flex gap-2 justify-center flex-wrap">
      <button 
        @click="selectCategory('')"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          selectedCategory === '' 
            ? 'bg-emerald-500 text-white shadow-md' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        ]"
      >
        All
      </button>
      <button 
        v-for="category in categories" 
        :key="category"
        @click="selectCategory(category)"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize',
          selectedCategory === category 
            ? 'bg-emerald-500 text-white shadow-md' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        ]"
      >
        {{ category.replace('-', ' ') }}
      </button>
    </div>
  </div>
</template>
