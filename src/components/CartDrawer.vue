<script setup lang="ts">
import { useStore } from '../services/store';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const store = useStore();
const router = useRouter();
const route = useRoute();

const isOpen = computed(() => route.query.cart === 'true');

const closeCart = () => {
  const query = { ...route.query };
  delete query.cart;
  router.push({ query });
};

const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
};
</script>

<template>
  <div>
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-linear"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-linear"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" @click="closeCart"></div>
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition transform duration-300 ease-in-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition transform duration-300 ease-in-out"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="isOpen" class="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl z-50 border-l border-zinc-100 dark:border-zinc-800 flex flex-col">
          
          <!-- Header -->
          <div class="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <h2 class="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  Your Cart
                  <span class="text-sm font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full ml-2">{{ store.cartCount.value }}</span>
              </h2>
              <button @click="closeCart" class="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-6">
              <div v-if="store.state.cart.length === 0" class="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div class="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 9.2a3 3 0 0 0 0 4.2l7.4 7.4a3 3 0 0 0 4.2 0l8.6-9.2a3 3 0 0 0 0-4.2Z"/><path d="m11 11 8-8"/></svg>
                  </div>
                  <div>
                      <h3 class="text-lg font-medium text-zinc-900 dark:text-white">Your cart is empty</h3>
                      <p class="text-zinc-500 dark:text-zinc-400 mt-1">Looks like you haven't added anything yet.</p>
                  </div>
                  <button @click="closeCart" class="text-violet-600 dark:text-violet-400 font-medium hover:underline">Start Shopping</button>
              </div>

              <div v-else class="space-y-6">
                  <div v-for="item in store.state.cart" :key="item.id" class="flex gap-4 group">
                      <div class="w-20 h-20 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 p-2 flex-shrink-0">
                          <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal">
                      </div>
                      <div class="flex-1 min-w-0">
                          <div class="flex justify-between items-start mb-1">
                              <h4 class="font-medium text-zinc-900 dark:text-white line-clamp-1 pr-2">{{ item.title }}</h4>
                              <button @click="store.removeFromCart(item.id)" class="text-zinc-400 hover:text-red-500 transition-colors p-1 -mr-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                              </button>
                          </div>
                          <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-3">LKR {{ (item.price * 300).toLocaleString() }}</p>
                          
                          <div class="flex items-center gap-3">
                              <div class="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                                  <button @click="store.updateQuantity(item.id, item.quantity - 1)" class="px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors disabled:opacity-50" :disabled="item.quantity <= 1">-</button>
                                  <span class="px-2 py-1 text-sm font-medium w-8 text-center text-zinc-900 dark:text-white">{{ item.quantity }}</span>
                                  <button @click="store.updateQuantity(item.id, item.quantity + 1)" class="px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">+</button>
                              </div>
                              <span class="hidden group-hover:inline-flex text-xs text-violet-600 font-medium">
                                  In Stock
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <!-- Footer -->
          <div v-if="store.state.cart.length > 0" class="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-zinc-500 dark:text-zinc-400">
                      <span>Subtotal</span>
                      <span>LKR {{ (store.cartTotal.value * 300).toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between text-zinc-500 dark:text-zinc-400">
                      <span>Shipping</span>
                      <span class="text-green-600 dark:text-green-400 text-sm font-medium">Free</span>
                  </div>
                  <div class="flex justify-between text-lg font-bold text-zinc-900 dark:text-white pt-3 border-t border-zinc-200 dark:border-zinc-700/50">
                      <span>Total</span>
                      <span>LKR {{ (store.cartTotal.value * 300).toLocaleString() }}</span>
                  </div>
              </div>
              
              <button @click="handleCheckout" class="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3.5 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                  Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
          </div>
      </div>
    </Transition>
  </div>
</template>
