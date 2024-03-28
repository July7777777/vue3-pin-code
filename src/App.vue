<template>
  <pinCode msg="Vite + Vue" :onComplete="onComplete" />
</template>

<script setup lang="ts">
import pinCode from './components/pinCode.vue'
const onComplete = (pin: string) => {
  console.log(pin)
}
</script>
