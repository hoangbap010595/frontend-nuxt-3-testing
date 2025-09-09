<template>
  <div class="text-secondary-darker dark:text-white bg-white dark:bg-black">

  </div>
</template>

<script lang="ts" setup>
// import { useI18n } from 'vue-i18n'
// import { useCounter } from '~/store/counter'
// import { isDark, toggleDark } from '~/composables/dark'

// const { t, locale, availableLocales } = useI18n()
// const counterStore = useCounter()

// fetch data from server/api
// const { data: dataHello } = await useAsyncData('/api/hello', () => {
//   return $fetch('/api/hello', {
//     params: {
//       name: 'world'
//     }
//   })
// })

const { data: dataProduct } = await useAsyncData('/api/product', () => {
  return $fetch('/api/product', {
    params: {}
  })
})

console.log('dataProduct', dataProduct.value)
</script>

<style scoped></style>
