<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from '../services/store';

const store = useStore();
const router = useRouter();

const handleLogout = () => {
  store.logout();
  router.push('/login');
};
const isDark = ref(document.documentElement.classList.contains('dark'));

const toggleDark = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  } else if (savedTheme === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
  // Default is dark (from html class), so if no savedTheme, we stick with dark
});

const searchQuery = ref('');


const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'home', query: { q: searchQuery.value } });
  } else {
    router.push({ name: 'home' });
  }
};
</script>

<template>
  <nav class="sticky top-0 z-50 w-full transition-all duration-300 border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-zinc-200 dark:border-zinc-800">
    <div class="container px-4 mx-auto h-20 flex items-center justify-between gap-6">
      
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3 group relative overflow-hidden rounded-xl p-1">
        <div class="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
        <div class="relative w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-violet-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>
        </div>
        <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-white dark:to-zinc-300 hidden sm:block tracking-tight">Aarsan store</span>
      </RouterLink>

      <!-- Search Bar -->
      <div class="flex-1 max-w-lg mx-auto hidden sm:block">
        <div class="relative group">
          <input 
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            type="text" 
            placeholder="Search for premium gadgets..." 
            class="w-full pl-12 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 focus:bg-white dark:focus:bg-zinc-800 transition-all duration-300 shadow-sm group-hover:shadow-md"
          />
          <span class="absolute left-4 top-3.5 text-zinc-400 group-hover:text-violet-500 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
        </div>
      </div>

      <!-- Mobile Search Icon (only visible on small screens) -->
       <div class="sm:hidden text-zinc-500 dark:text-zinc-400">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
       </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <RouterLink to="/" class="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-violet-600 dark:hover:text-violet-400 transition-all font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </RouterLink>

        <!-- User Profile / Login -->
        <div v-if="store.state.isAuthenticated && store.state.user" class="relative group">
            <button class="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                <img :src="store.state.user.image" :alt="store.state.user.username" class="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100">
                <span class="text-sm font-medium text-zinc-700 dark:text-zinc-200 hidden sm:block">{{ store.state.user.firstName }}</span>
            </button>
            
            <!-- Dropdown -->
            <div class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <div class="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                    <p class="text-sm font-semibold text-zinc-900 dark:text-white truncate">{{ store.state.user.firstName }} {{ store.state.user.lastName }}</p>
                    <p class="text-xs text-zinc-500 truncate">{{ store.state.user.email }}</p>
                </div>
                <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                    Sign Out
                </button>
            </div>
        </div>

        <RouterLink v-else to="/login" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all font-bold shadow-lg shadow-zinc-500/20 active:scale-95">
            Log In
        </RouterLink>
        
        <button 
          @click="toggleDark" 
          class="relative p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <div class="relative w-5 h-5">
             <transition
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="opacity-0 rotate-90 scale-50"
                enter-to-class="opacity-100 rotate-0 scale-100"
                leave-active-class="transition duration-300 ease-in absolute top-0 left-0"
                leave-from-class="opacity-100 rotate-0 scale-100"
                leave-to-class="opacity-0 -rotate-90 scale-50"
             >
                <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
             </transition>
          </div>
        </button>
      </div>
    </div>
  </nav>
</template>
