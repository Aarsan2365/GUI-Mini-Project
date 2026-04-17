<template>
  <footer class="bg-[#111111] text-zinc-400 py-24 text-xs font-medium border-t border-zinc-800/50">
    <div class="w-full max-w-[1440px] mx-auto px-8 lg:px-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center place-items-center">
        
        <!-- Brand Column -->
        <div class="flex flex-col items-center gap-10">
          <h2 class="text-white text-base font-bold tracking-widest uppercase">AARZ STORE</h2>
          <div class="uppercase tracking-widest leading-loose text-[#666666] text-[10px]">
            <p>&copy; {{ new Date().getFullYear() }} AARZ STORE.</p>
            <p>PREMIUM TECHNOLOGY.</p>
          </div>
        </div>

        <!-- Links Column 1 -->
        <div class="flex flex-col items-center gap-5 pt-1">
          <a href="#" class="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>

        <!-- Links Column 2 -->
        <div class="flex flex-col items-center gap-5 pt-1">
          <a href="#" class="hover:text-white transition-colors duration-300">Shipping & Returns</a>
          <a href="#" class="hover:text-white transition-colors duration-300">Support</a>
        </div>

        <!-- Social Links -->
        <div class="flex flex-col items-center gap-5 pt-1">
          <a href="#" class="hover:text-white transition-colors duration-300">Instagram</a>
          <a href="#" class="hover:text-white transition-colors duration-300">Twitter</a>
        </div>
        
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
