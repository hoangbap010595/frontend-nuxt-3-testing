<template>
  <div class="w-full">
    <div class="relative aspect-[4/3] p-4 flex flex-col w-full border border-[#0000001A]">
      <transition name="fade-scale" mode="out-in">
        <img :key="images[current]" :src="images[current]" :alt="`Product image ${current + 1}`" class="h-full w-full object-contain p-10" />
      </transition>

      <div class="flex items-center justify-end gap-2">
        <button class="rounded-full w-10 h-10 bg-[#EFF2F6CC] hover:bg-[#EFF2F6] cursor-pointer p-2" @click="prev">
          <img src="/icons/arrow-left.svg" alt="Prev" class="w-full h-full" />
        </button>
        <button class="rounded-full w-10 h-10 bg-[#EFF2F6CC] hover:bg-[#EFF2F6] cursor-pointer p-2" @click="next">
          <img src="/icons/arrow-right.svg" alt="Next" class="w-full h-full" />
        </button>
      </div>
    </div>
    <div class="mt-2 grid grid-cols-4 gap-2">
      <button v-for="(src, idx) in images" :key="idx" class="relative aspect-[4/3] overflow-hidden"
        :class="idx === current ? 'border border-[#231F20]' : ''" @click="go(idx)">
        <img :src="src" class="h-full w-full object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ images: string[] }>();

const emit = defineEmits(['change']);
const current = ref(0);

const go = (i: number) => { current.value = (i + props.images.length) % props.images.length; emit('change', current.value); };
const next = () => go(current.value + 1);
const prev = () => go(current.value - 1);
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>