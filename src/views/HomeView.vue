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
  // Clear search query if filtering by category
  if (route.query.q) {
      // Ideally push to route without query but stay on home.
      // For now just fetch.
  }

  try {
    if (category) {
      products.value = await fetchProductsByCategory(category);
    } else {
      await loadProducts(); // Fallback to load default or search if present
    }
  } catch (err) {
      error.value = "Failed to filter products.";
  } finally {
      loading.value = false;
  }
};

onMounted(loadProducts);

// Watch for search query changes in URL
watch(() => route.query.q, loadProducts);
</script>

<template>
  <div class="home-view min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <FilterBar @filter="handleFilter" />

    <div class="container mx-auto px-4 pb-12">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        <div class="w-12 h-12 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <p>Loading amazing products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-500 text-lg mb-4">{{ error }}</p>
        <button @click="loadProducts" class="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">Try Again</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="products.length === 0" class="text-center py-20 text-gray-500">
        <p class="text-xl">No products found matching your criteria.</p>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </div>
  </div>
</template>
