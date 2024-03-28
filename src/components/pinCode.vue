<!-- PinCode.vue -->
<template>
  <div class="pin-code">
    <input v-for="(_, index) in maxInputs" :class="[shape, 'pin-code-input']" :key="index" type="tel" maxlength="1"
      autocomplete="off" @input="handleInput(index, $event)" @keydown.backspace="onBackspace(index)"
      @keydown.space.prevent @focus="selectText($event)" pattern="[0-9]*" inputmode="numeric" />
  </div>
</template>
<script setup lang="ts">
  import { ref, watchEffect, defineProps, nextTick } from 'vue';
  import Props from './props';
  const props = defineProps(Props);
  // 样式处理 start
  // const { margin, width, height, shape } = props;
  // const baseStyle = { margin: `${margin}px`, width: `${width}px`, height: `${height}px`, backgroundColor: '#000', border: '1px solid #81c784' }
  // 样式处理 end
  const { autoComplete, maxInputs, onComplete, shape } = props;//数据、函数等
  // const InputElementArr = ref<HTMLInputElement[]>([]);
  const InputElementArr = ref<readonly HTMLInputElement[]>([]);
  const pinCode = ref<string[]>(Array(props.maxInputs).fill(''));

  watchEffect(async () => {
    await nextTick()
    InputElementArr.value = Array.from(document.getElementsByClassName('pin-code-input')) as HTMLInputElement[];
    console.log('重新渲染了')
  });

  const handleInput = (index: number, v: any) => {
    const value = v?.target?.value.replace(/ /g, '') || v?.data.replace(/ /g, '')
    if (value?.length === 1) {
      pinCode.value[index] = value;
      if (pinCode.value.every((d) => Boolean(d))) { // 确保每个元素都不为空字符串
        InputElementArr.value[index]?.blur();
        autoComplete && onComplete(pinCode.value.join(''))
      } else {
        focusNextInput(index + 1);
      }
    }
  };
  const focusNextInput = (index: number) => {
    if (index <= props.maxInputs - 1) {
      InputElementArr.value[index]?.focus();
    }
  };
  // 退格键
  const onBackspace = async (currentIndex: number) => {
    if (currentIndex >= 0 && currentIndex < pinCode.value.length) {
      pinCode.value[currentIndex] = '';

      // 如果不是第一个输入框，则聚焦到前一个输入框
      if (currentIndex > 0) {
        InputElementArr.value[currentIndex - 1]?.focus();
      } else if (currentIndex === 0) {
        // 如果已经在第一个输入框按Backspace键，可以选择是否重置整个pinCode数组
        // 在这里，我们不需要重置整个数组，只需聚焦到最后一个输入框即可
        InputElementArr.value[pinCode.value.length - 1]?.focus();
      }
      // pinCode.value[currentIndex - 1] = '';
    }
  };
  // 选择并聚焦文本输入框中的文本。
  const selectText = (event: FocusEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      target.setSelectionRange(0, target.value.length);
    }
  };
</script>

<style scoped>
  input {
    margin: 10px;
    width: 50px;
    height: 50px;
    text-align: center;
    border: 1px solid #ccc;
  }

  .pin-code {
    display: flex;
    justify-content: space-between;
  }
</style>