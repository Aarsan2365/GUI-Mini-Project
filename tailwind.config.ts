import type { Config } from 'tailwindcss'

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // "bg-main" will use the variable var(--color-bg-main)
                main: 'var(--color-bg-main)',
                
                // "text-main" will use var(--color-text-main)
                'main-text': 'var(--color-text-main)',
                
                // "bg-brand" will use var(--color-primary)
                brand: 'var(--color-primary)',

                // "bg-nav-glass" will use var(--color-nav)
                'nav-glass': 'var(--color-nav)',
            }
        },
    },
    plugins: [],
} satisfies Config