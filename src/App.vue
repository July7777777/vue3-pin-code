<template>
  <pinCode id="1" ref="childRef" shape="Box" :isMask="false" :completeFn="onComplete" />
  <!-- <pinCode id="2" ref="childRef" shape="Circle" :isMask="false" :completeFn="onComplete" />
  <pinCode id="3" ref="childRef" shape="Line" :isMask="false" :completeFn="onComplete" />
  <pinCode ref="childRef" shape="Line" :isMask="true" :completeFn="onComplete" />
  <pinCode id=" 6 " ref="childRef" shape="Line" :isMask="true" :completeFn="onComplete" /> -->
  <!-- <button @click="handler">aa</button> -->
</template>

<script setup lang="ts">
  import pinCode from './components/pinCode.vue'
  import { ref } from "vue";
  let childRef = ref<InstanceType<typeof pinCode> | undefined>(undefined);
  const onComplete = (pin: Array<string>) => {
    console.log(pin)
  }
</script>
