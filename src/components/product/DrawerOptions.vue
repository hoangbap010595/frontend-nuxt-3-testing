<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div v-if="open" class="fixed inset-0 z-40 bg-black/40" @click="onClose" />
  </Transition>

  <!-- Drawer -->
  <Transition name="slide">
    <div v-if="open" class="fixed right-0 top-0 z-50 h-full w-full max-w-lg bg-white shadow-xl">
      <div class="mb-4 flex items-start justify-between p-5 shadow">
        <h3 class="text-xl font-normal text-[#231F20] uppercase">{{ typeName }}</h3>
        <button class="rounded-full cursor-pointer" @click="onClose">✕</button>
      </div>

      <div class="p-5 divide-y divide-[#00000024]">
        <CustomRadio v-for="opt in options" :key="opt.uid" v-model="tempSelected" :name="radioName" :value="opt.uid"
          @update:model-value="pick(opt.uid)">
          {{ opt.displayName }}
        </CustomRadio>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import CustomRadio from '~/components/shared/CustomRadio.vue';

const props = defineProps<{
  open: boolean;
  typeName: string;
  options: any[];
  selectedUid: string;
}>();

const emit = defineEmits(['update:selected', 'close']);
// const { formatCents } = useMoney();

const tempSelected = ref(props.selectedUid);
watch(() => props.selectedUid, (v) => (tempSelected.value = v));

const radioName = `opt-${Math.random().toString(36).slice(2, 9)}`;
const pick = (uid: string) => {
  tempSelected.value = uid;
  emit('update:selected', uid);
  emit('close');
};
const onClose = () => emit('close');
</script>

<style scoped>
/* Overlay fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Drawer slide from right */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
