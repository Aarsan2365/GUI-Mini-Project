<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchProducts, type Product } from '../services/api';
import ProductCard from '../components/ProductCard.vue';

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (err) {
    error.value = 'Failed to load products. Please try again later.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="home-view">
    <div v-if="loading" class="loading">
      Loading products...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="product-grid">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  padding: 2rem 0;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #e74c3c;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
</style>
