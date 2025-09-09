<template>
  <div class="fixed top-5 right-5 z-50 flex flex-col space-y-3">
    <transition-group name="toast-slide" tag="div">
      <div v-for="t in toasts" :key="t.id"
        class="rounded-xl bg-gray-900 px-4 py-3 mb-1 text-sm text-white shadow-lg flex items-center space-x-2">
        <span>{{ t.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
interface ToastItem {
  id: number;
  message: string;
}

const toasts = ref<ToastItem[]>([]);
let seed = 0;

const show = (msg: string, ms = 2500) => {
  const id = seed++;
  toasts.value.push({ id, message: msg });

  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, ms);
};

defineExpose({ show });
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
