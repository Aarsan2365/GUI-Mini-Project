<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import CartDrawer from './components/CartDrawer.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>
  
  <CartDrawer />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>
