<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <NavBar />
    </header>
    
    <main class="flex-grow">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
</style>
