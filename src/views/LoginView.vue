<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../services/store';

const username = ref(''); // Default for testing
const password = ref(''); // Default for testing
const error = ref('');
const loading = ref(false);

const router = useRouter();
const { login } = useStore();

const handleLogin = async () => {
    loading.value = true;
    error.value = '';

    try {
        // If user entered an email, try to extract the username part
        // This is a workaround because DummyJSON requires 'username' but the UI asks for 'Email'
        let apiUsername = username.value;
        if (apiUsername.includes('@')) {
            apiUsername = apiUsername.split('@')[0];
        }

        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: apiUsername,
                password: password.value,
                expiresInMins: 60,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
        }

        login(data);
        router.push('/');
    } catch (err: any) {
        console.error('Login error:', err);
        error.value = err.message || 'Login failed. Please check your credentials.';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800">
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    Welcome Back
                </h2>
                <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Sign in to access your premium account
                </p>
            </div>
            
            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <div class="rounded-md shadow-sm space-y-4">
                    <div>
                        <label for="username" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                        <input id="username" name="username" type="text" required v-model="username" 
                            class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 text-zinc-900 dark:text-white dark:bg-zinc-800 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm transition-colors" 
                            placeholder="Email" 
                        />
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
                        <input id="password" name="password" type="password" required v-model="password" 
                            class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 text-zinc-900 dark:text-white dark:bg-zinc-800 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm transition-colors" 
                            placeholder="Password" 
                        />
                    </div>
                </div>

                <div v-if="error" class="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                    {{ error }}
                </div>

                <div>
                    <button type="submit" :disabled="loading" 
                        class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="animate-spin h-5 w-5 text-white dark:text-zinc-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                        {{ loading ? 'Signing in...' : 'Sign in' }}
                    </button>
                </div>
                
                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3 flex-1 md:flex md:justify-between">
                            <p class="text-sm text-blue-700 dark:text-blue-300">
                                <strong>Demo Mode:</strong> You cannot use your personal email.
                            </p>
                            <p class="mt-2 text-sm md:mt-0 md:ml-6">
                                <span class="font-medium text-blue-700 dark:text-blue-300">Use:</span> 
                                <code class="bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded text-blue-800 dark:text-blue-200 font-mono">emilys</code>
                                <span class="mx-1">/</span>
                                <code class="bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded text-blue-800 dark:text-blue-200 font-mono">emilyspass</code>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
