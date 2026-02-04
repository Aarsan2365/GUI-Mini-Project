<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <RouterLink to="/" class="brand">
        🛍️ FakeStore
      </RouterLink>
      <div class="links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #1a1a1a;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #eeeeee;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #aaaaaa;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.router-link-active {
  color: #42b883;
}
</style>
