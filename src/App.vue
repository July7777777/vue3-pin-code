<template>
  <pinCode ref="childRef" shape="Line" :isMask="false" :completeFn="onComplete" />
  <!-- <button @click="handler">aa</button> -->
</template>

<script setup lang="ts">
import pinCode from './components/pinCode.vue'
import { ref} from "vue";
let childRef = ref<InstanceType<typeof pinCode> | undefined>(undefined);
const onComplete = (pin: Array<string>) => {
  console.log(pin)
}
// const handler=()=>{
//   childRef.value?.onComplete([]);
// }
</script>
