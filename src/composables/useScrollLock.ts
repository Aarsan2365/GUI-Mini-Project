import { ref, watch, onUnmounted } from 'vue';

export function useScrollLock() {
    const isLocked = ref(false);

    watch(isLocked, (val) => {
        if (typeof document !== 'undefined') {
            if (val) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });

    onUnmounted(() => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = '';
        }
    });

    return isLocked;
}
