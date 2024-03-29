<!-- PinCode.vue -->
<template>
  <div class="pin-code" :id="id" :class="[shape]">
    <input v-for="(_, index) in maxInputs"
      :class="['pin-code-input', isMask ? '' : 'font', pinCode[index].length === 0 ? 'emptyBGC' : '',]" :key="index"
      type="text" maxlength="1" autocomplete="off" @input="handleInput(index, $event)"
      @keydown.backspace="onBackspace(index)" @keydown.space.prevent @keydown.backspace.prevent
      @focus="selectText($event)" />
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import Props from "./props";
  const props = defineProps(Props);
  const { maxInputs, completeFn, shape, isMask, maskFlag, id, isPaste } = props;
  const InputElementArr = ref<readonly HTMLInputElement[]>([]);
  const pinCode = ref<string[]>(Array(props.maxInputs).fill(""));
  onMounted(() => {
    const idElement = document.getElementById(id) as HTMLInputElement;
    InputElementArr.value = Array.from(
      idElement.getElementsByClassName("pin-code-input")
    ) as HTMLInputElement[];

    // 监听粘贴事件
    isPaste && window.addEventListener('paste', pasteHandler)
  })
  const pasteHandler = (event: any) => {
    const value = event?.clipboardData?.getData('text/plain')

    const data = Array.from(value.replace(/\s/g, ''))
    if (data.length === 0) return;
    data.length = maxInputs
    for (let i = 0; i < maxInputs; i++) {
      if (data[i] === undefined) break;
      pinCode.value[i] = data[i] as string;
      InputElementArr.value[i].value = isMask ? maskFlag : data[i] as string;
    }
    pinCode.value.every(d => Boolean(d)) && completeFn(Array.from(pinCode.value));
  }
  const handleInput = (index: number, v: any) => {
    if (!v?.target?.value) return;
    const value = v?.target?.value || v?.data;
    if (value?.length === 1) {
      pinCode.value[index] = value;
      InputElementArr.value[index].value = isMask ? maskFlag : value;
      if (pinCode.value.every(d => Boolean(d))) {
        // 确保每个元素都不为空字符串
        InputElementArr.value[index]?.blur();
        // autoComplete &&
        completeFn(Array.from(pinCode.value));
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
    }
  };
  // 选择并聚焦文本输入框中的文本。
  const selectText = (event: FocusEvent) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      target.setSelectionRange(0, target.value.length);
    }
  };
  // defineExpose({
  //   onComplete: completeFn(pinCode.value)
  // })
</script>

<style scoped>
  input {
    color: #4b4d51;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    border: none;
    outline: none;
    margin: 10px;
    width: 30px;
    height: 30px;
    text-align: center;
    /* padding: 10px 7px; */
  }

  .font {
    font-size: 16px;
    font-weight: bold;
  }

  .Box {
    input {
      height: 40px;
      border-radius: 3px;
      background-color: #f5f7fa78;
      box-shadow: 2px 3px 12px 0 rgba(116, 116, 116, 0.3);
    }

    input:focus {
      box-shadow: 0px 0px 17px 0px #3d70ff80;
      background-color: #d4d8e466;
    }

    .emptyBGC {
      background-color: #f4f5f7;
      border-color: #e4e7ed;
      box-shadow: inset 2px 2px 12px 0 rgba(170, 170, 170, 0.2);
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
      border-bottom: 3px solid #409eff;
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
