<!-- PinCode.vue -->
<template>
  <div class="pin-code" :class="[shape]">
    <input v-for="(_, index) in maxInputs"
      :class="['pin-code-input', isMask ? '' : 'font', pinCode[index].length === 0 ? 'emptyBGC' : '']" :key="index"
      type="text" maxlength="1" autocomplete="off" @input="handleInput(index, $event)"
      @keydown.backspace="onBackspace(index)" @keydown.space.prevent @keydown.backspace.prevent
      @focus="selectText($event)" />
  </div>
</template>
<script setup lang="ts">
  import { ref, watchEffect, nextTick,  defineExpose } from "vue";
  import Props from "./props";
  const props = defineProps(Props);
  // 样式处理 start
  // const { margin, width, height, shape } = props;
  // const baseStyle = { margin: `${margin}px`, width: `${width}px`, height: `${height}px`, backgroundColor: '#000', border: '1px solid #81c784' }
  // 样式处理 end
  const { autoComplete, maxInputs, completeFn, shape, isMask, maskFlag, } = props; //数据、函数等
  const InputElementArr = ref<readonly HTMLInputElement[]>([]);
  const pinCode = ref<string[]>(Array(props.maxInputs).fill(""));
  watchEffect(async () => {
    await nextTick();
    InputElementArr.value = Array.from(
      document.getElementsByClassName("pin-code-input")
    ) as HTMLInputElement[];
    console.log("重新渲染了");
  });

  // const onComplete = () => completeFn(pinCode.value);
  const handleInput = (index: number, v: any) => {
    if (!v?.target?.value) return;
    const value = v?.target?.value || v?.data;
    if (value?.length === 1) {
      pinCode.value[index] = value;
      InputElementArr.value[index].value = isMask ? maskFlag : value;
      if (pinCode.value.every(d => Boolean(d))) {
        // 确保每个元素都不为空字符串
        InputElementArr.value[index]?.blur();
        autoComplete && completeFn(pinCode.value);
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
      pinCode.value[currentIndex] = "";
      InputElementArr.value[currentIndex].value = "";

      // 如果不是第一个输入框，则聚焦到前一个输入框
      if (currentIndex > 0) {
        InputElementArr.value[currentIndex - 1]?.focus();
      }
      //  else if (currentIndex === 0) {
      // }
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
  defineExpose({
    onComplete: completeFn(pinCode.value)
  })
</script>

<style scoped>
  input {
    border: none;
    outline: none;
    margin: 10px;
    width: 40px;
    height: 40px;
    text-align: center;
    /* padding: 10px 7px; */
  }

  .font {
    font-size: larger;
    font-weight: bold;
  }

  .Box {
    input {
      height: 55px;
      border: 2px solid #67c23a;
    }

    input:focus {
      border: 2px solid #40a0ff90;
      /* background-color: #409EFF; */
    }

    .emptyBGC {
      border-color: #f56c6c;
      /* background-color: #F56C6C; */
    }
  }

  .Circle {
    input {
      border-radius: 50%;
      border: 2px solid #67c23a;
    }

    input:focus {
      /* border: 2px solid #409EFF; */
      /* background-color: #409EFF; */
      border-color: #409eff;
    }

    .emptyBGC {
      border-color: #f56c6c;
      /* background-color: #F56C6C; */
    }
  }

  .Line {
    input {
      border-bottom: 2px solid #67c23a;
    }

    input:focus {
      border-bottom: 2px solid #409eff;
      /* border: 2px solid #409EFF; */
      /* background-color: #409EFF; */
    }

    .emptyBGC {
      border-color: #f56c6c;
      /* background-color: #F56C6C; */
    }
  }

  .emptyBGC {
    border-color: #f56c6c;
    /* background-color: #F56C6C; */
  }

  .pin-code {
    display: flex;
    justify-content: center;
  }
</style>
