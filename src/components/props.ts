import { PropType } from "vue";

export default {
  maxInputs: {
    //有几个输入框，非必填，number类型，默认值为4
    required: false,
    type: Number as PropType<number>,
    default: 4,
    validator(value: number) {
      return value > 0;
    },
  },
  autoComplete: {
    //输入完毕后是否自动调用回调函数，非必填，Boolean类型，默认值为true
    required: false,
    type: Boolean as PropType<boolean>,
    default: true,
  },
  completeFn: {
    //输入完毕回调函数，必填，Function类型，
    required: true,
    type: Function as PropType<(pinArr: Array<string>) => void>,
    default: () => ([]) => { },
  },
  isMask: {
    //是否遮盖pin码，非必填，Boolean类型，默认值为true
    required: false,
    type: Boolean as PropType<boolean>,
    default: true,
  },
  maskFlag: {
    //pin码遮盖物，非必填，String类型，默认值为🙈
    required: false,
    type: String as PropType<string>,
    default: '🙈',
  },
  // 样式
  margin: {
    //输入框之间的外边距，
    required: false,
    type: Number as PropType<number>,
    default: 10,
  },
  width: {
    //输入框的整体宽度，
    required: false,
    type: Number as PropType<number>,
    default: 47,
  },
  height: {
    //输入框之间的整体高度，
    required: false,
    type: Number as PropType<number>,
    default: 47,
  },
  shape: {
    //输入框之间的形状，
    required: false,
    type: String as PropType<"Box" | "Circle" | "Line">,
    validator: (value: "Box" | "Circle" | "Line") => {
      return ["Box", "Circle", "Line"].includes(value) ?? "Box";
    },
    default: "Box",
  },
};
