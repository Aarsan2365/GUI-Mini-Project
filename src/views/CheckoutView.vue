<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../stores/mainStore';

const router = useRouter();
const store = useStore();

const currentStep = ref<'address' | 'payment'>('address');

// Address step refs
const fullName = ref('');
const addressLine = ref('');
const city = ref('');
const zipCode = ref('');

// Payment step refs
const cardNumber = ref('');
const cardName = ref('');
const expiry = ref('');
const cvv = ref('');
const isProcessing = ref(false);
const isSuccess = ref(false);

const handleAddressSubmit = () => {
    // Basic validation is handled by 'required' attribute on inputs
    currentStep.value = 'payment';
};

const handlePayment = () => {
    isProcessing.value = true;
    setTimeout(() => {
        isProcessing.value = false;
        isSuccess.value = true;
        store.clearCart(); 
        setTimeout(() => {
            router.push('/');
        }, 3000);
    }, 2000);
};

const goBack = () => {
    if (currentStep.value === 'payment') {
        currentStep.value = 'address';
    } else {
        router.back();
    }
};
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 md:py-20 px-4 transition-colors duration-300 flex items-center justify-center relative overflow-hidden">

    <div class="container max-w-2xl relative z-10">
      <button @click="goBack" class="mb-6 flex items-center gap-2 text-zinc-500 hover:text-violet-500 transition-colors font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back
      </button>

      <!-- Stepper UI -->
      <div class="max-w-xl mx-auto mb-10 w-full px-4">
        <div class="flex items-center justify-between relative">
          <!-- Background Line -->
          <div class="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 z-0"></div>
          
          <!-- Animated Progress Line -->
          <div class="absolute left-0 top-1/2 transform -translate-y-1/2 h-[2px] bg-teal-500 transition-all duration-500 z-0 delay-100" 
               :style="{ width: isSuccess ? '100%' : (currentStep === 'payment' ? '50%' : '0%') }"></div>

          <!-- Step 1 -->
          <div class="relative z-10 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-2" :class="(!isSuccess && currentStep === 'address') ? 'text-teal-500' : 'text-zinc-400 dark:text-zinc-500'">
             <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 bg-teal-500 text-white shadow-md">
               <svg v-if="currentStep === 'payment' || isSuccess" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
               <span v-else>1</span>
             </div>
             <span class="ml-3 font-medium hidden sm:block transition-colors" :class="currentStep === 'address' && !isSuccess ? 'text-teal-500' : ''">Address</span>
          </div>

          <!-- Step 2 -->
          <div class="relative z-10 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-2" :class="(!isSuccess && currentStep === 'payment') ? 'text-teal-500' : 'text-zinc-400 dark:text-zinc-500'">
             <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 delay-100" :class="currentStep === 'payment' || isSuccess ? 'bg-teal-500 text-white shadow-md' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'">
               <svg v-if="isSuccess" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
               <span v-else>2</span>
             </div>
             <span class="ml-3 font-medium hidden sm:block transition-colors" :class="currentStep === 'payment' && !isSuccess ? 'text-teal-500' : ''">Payment</span>
          </div>

          <!-- Step 3 -->
          <div class="relative z-10 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-2" :class="isSuccess ? 'text-teal-500' : 'text-zinc-400 dark:text-zinc-500'">
             <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 delay-300" :class="isSuccess ? 'bg-teal-500 text-white shadow-md' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'">3</div>
             <span class="ml-3 font-medium hidden sm:block transition-colors" :class="isSuccess ? 'text-teal-500' : ''">Order Confirmation</span>
          </div>
        </div>
      </div>

      <div v-if="isSuccess" class="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center shadow-2xl border border-zinc-100 dark:border-zinc-800 animate-in zoom-in duration-500">
        <div class="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 class="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">Payment Successful!</h2>
        <p class="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">Thank you for your purchase. We are processing your order and redirecting you to the home page...</p>
      </div>

      <div v-else class="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 relative min-h-[500px]">

        <!-- ADDRESS STEP -->
        <div v-if="currentStep === 'address'" class="animate-in fade-in slide-in-from-left-4 duration-300 relative w-full h-full bg-white dark:bg-zinc-900 z-10">
            <div class="p-8 md:p-10 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h1 class="text-2xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2 mb-1">
                Delivery Details
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-violet-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </h1>
              <p class="text-zinc-500 dark:text-zinc-400 text-sm">Where should we send your order?</p>
            </div>

            <form @submit.prevent="handleAddressSubmit" class="p-8 md:p-10 space-y-6">
              <div class="space-y-4">
                 <div>
                    <label class="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Full Name</label>
                    <input v-model="fullName" required type="text" placeholder="John Doe" class="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium text-zinc-900 dark:text-white placeholder-zinc-400">
                 </div>

                 <div>
                    <label class="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Address</label>
                    <input v-model="addressLine" required type="text" placeholder="123 Main St, Apartment 4B" class="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium text-zinc-900 dark:text-white placeholder-zinc-400">
                 </div>

                 <div class="grid grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">City</label>
                      <input v-model="city" required type="text" placeholder="Colombo" class="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium text-zinc-900 dark:text-white placeholder-zinc-400">
                    </div>
                    <div>
                      <label class="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">ZIP Code</label>
                      <input v-model="zipCode" required type="text" placeholder="00100" class="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium text-zinc-900 dark:text-white placeholder-zinc-400">
                    </div>
                 </div>
              </div>

              <button type="submit" class="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                 Continue to Payment
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </form>
        </div>

        <!-- PAYMENT STEP -->
        <div v-else-if="currentStep === 'payment'" class="animate-in fade-in slide-in-from-right-4 duration-300 relative w-full h-full bg-white dark:bg-zinc-900 z-10">
            <div class="p-8 md:p-10 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
              <div>
                <h1 class="text-2xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2 mb-1">
                  Secure Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </h1>
                <p class="text-zinc-500 dark:text-zinc-400 text-sm">Enter your debit or credit card details</p>
              </div>
              <div class="flex gap-2">
                <div class="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-[10px] italic shadow-sm">VISA</div>
                <div class="w-10 h-6 bg-red-500 rounded flex items-center justify-center text-white font-bold text-[10px] relative overflow-hidden shadow-sm">
                   <span class="relative z-10">MC</span>
                   <div class="absolute w-4 h-4 rounded-full bg-orange-400 opacity-80 left-1"></div>
                   <div class="absolute w-4 h-4 rounded-full bg-yellow-400 opacity-80 right-1"></div>
                </div>
              </div>
            </div>

            <form @submit.prevent="handlePayment" class="p-8 md:p-10 space-y-6">
              <div class="space-y-4">
                 <div>
                    <label class="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Cardholder Name</label>
                    <input v-model="cardName" required type="text" placeholder="John Doe" class="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium text-zinc-900 dark:text-white placeholder-zinc-400">
                 </div>

                 <div>
                    <label class="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Card Number</label>
                    <div class="relative">
                      <input v-model="cardNumber" required type="text" placeholder="0000 0000 0000 0000" maxlength="19" class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium text-zinc-900 dark:text-white placeholder-zinc-400 tracking-widest">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-4 top-4 text-zinc-400"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                    </div>
                 </div>

                 <div class="grid grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Expiry Date</label>
                      <input v-model="expiry" required type="text" placeholder="MM/YY" maxlength="5" class="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium text-zinc-900 dark:text-white placeholder-zinc-400">
                    </div>
                    <div>
                      <label class="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">CVV</label>
                      <div class="relative">
                         <input v-model="cvv" required type="password" placeholder="•••" maxlength="4" class="w-full px-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium text-zinc-900 dark:text-white placeholder-zinc-400 tracking-widest">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute right-4 top-4 text-zinc-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                      </div>
                    </div>
                 </div>
              </div>

              <button type="submit" :disabled="isProcessing" class="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed">
                 <template v-if="isProcessing">
                    <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Payment...
                 </template>
                 <template v-else>
                    Pay LKR {{ (store.cartTotal * 300).toLocaleString() }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                 </template>
              </button>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>
