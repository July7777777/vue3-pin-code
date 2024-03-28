import { PropType } from 'vue';

export default {
  maxInputs: {//有几个输入框，非必填，number类型，默认值为4
    required: false,
    type: Number as PropType<number>,
    default: 4,
    validator(value: number) {
      return value > 0
    },
  },
  autoComplete: {//输入完毕后是否自动调用回调函数，非必填，Boolean类型，默认值为true
    required: false,
    type: Boolean as PropType<boolean>,
    default: true,
  },
  onComplete: {//输入完毕回调函数，必填，Function类型，
    required: true,
    type: Function as PropType<(pin: string) => void>,
    default: () => () => { }
  },

  // 样式
  margin: {//输入框之间的外边距，
    required: false,
    type: Number as PropType<number>,
    default: 10,
  },
  width: {//输入框的整体宽度，
    required: false,
    type: Number as PropType<number>,
    default: 47,
  },
  height: {//输入框之间的整体高度，
    required: false,
    type: Number as PropType<number>,
    default: 47,
  },
  shape: {//输入框之间的形状，
    required: false,
    type: String as PropType<'Box' | 'Circle' | 'SolidCircle'>,
    validator: (value: 'Box' | 'Circle' | 'SolidCircle') => {
      return ['Box', 'Circle', 'SolidCircle'].includes(value) ?? 'Box';
    },
    default: 'Box',
  },
}