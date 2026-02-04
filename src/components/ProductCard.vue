<script setup lang="ts">
import type { Product } from '../services/api';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image" :alt="product.title" loading="lazy" />
    </div>
    <div class="info">
      <h3 class="title" :title="product.title">{{ product.title }}</h3>
      <p class="category">{{ product.category }}</p>
      <div class="price-row">
        <span class="price">${{ product.price.toFixed(2) }}</span>
        <div class="rating">
           ⭐ {{ product.rating.rate }} ({{ product.rating.count }})
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #333;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  border-color: #42b883;
}

.image-container {
  height: 200px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #eeeeee;
}

.category {
  font-size: 0.85rem;
  color: #999;
  text-transform: capitalize;
  margin-bottom: auto;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #42b883;
}

.rating {
  font-size: 0.85rem;
  color: #f1c40f;
}
</style>
