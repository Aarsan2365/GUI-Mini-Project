import { ref, watch } from 'vue';

export function useDarkMode() {
    const isDark = ref(
        typeof document !== 'undefined'
            ? document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark'
            : false
    );

    if (typeof document !== 'undefined') {
        if (isDark.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    watch(isDark, (val) => {
        if (typeof document !== 'undefined') {
            if (val) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    });

    const toggleDark = () => {
        isDark.value = !isDark.value;
    };

    return { isDark, toggleDark };
}
