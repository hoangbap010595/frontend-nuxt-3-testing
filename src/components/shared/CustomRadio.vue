<template>
  <label class="flex items-center justify-between p-3 gap-3 cursor-pointer">
    <div class="font-semibold text-sm text-[#231F20]">
      <slot />
    </div>
    <div class="w-5 h-5 flex items-center justify-center border rounded-full"
      :class="checked ? 'border-[#231F20] bg-[#231F20]' : 'border-[#00000024]'">
      <img v-if="checked" src="/icons/check.svg" alt="checked" class="w-3 h-3" />
    </div>
    <input type="radio" :name="name" :value="value" :checked="checked" @change="$emit('update:modelValue', value)"
      class="hidden" />
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  name: string
  value: string
}>()

const checked = computed(() => props.modelValue === props.value)

defineEmits(['update:modelValue'])
</script>
