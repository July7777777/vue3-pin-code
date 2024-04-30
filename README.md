<h2 align="center">Vue3-pin-code</h2>
<p align="center">基于 Vue3+TS+Vite 开发，简单且高度可自由配置的输入框组件</p>


### Demo

> ~~[点击此处访问在线demo](https://github.com/July7777777/vue3-pin-code)~~ (还没开始写demo)

> [点击此处访问 **组件源码** 和 **使用文档** ](https://github.com/July7777777/vue3-pin-code)

## Usage

```bash

#如果你已经安装了 nodejs 以及 Vue3 等环境，可直接执行下列命令，否则需先安装环境

npm install vue3-pin-code@last -D

#导入组件及其样式
  ※：建议在使用的文件中导入使用，会有语法和参数提示
<template>
  <PinCode :complete-fn="(arr) => { console.log(arr) }" />
</template>

<script lang="ts" setup>
  import PinCode from "vue3-pin-code";
  import "vue3-pin-code/dist/style.css";
</script>
```

## 组件主要参数（props）

| 参数名称 |参数描述| 是否必填 | 参数类型 |默认值或示例|
| :------------: | ------------ | :------------: | :------------: | :------------: |
| completeFn  |  完成输入时自动触发的回调函数(会返回一个数组) | 是  |  Function | (arr) => {console.log(arr) }  |
|  maxInputs | 输入框数量  | 否  |  Number | 4  |
| id  | 组件唯一标识（一个页面使用多个本组件则建议使用）  |  否  | String  | ''  |
| isPaste  | 是否允许粘贴（只会粘贴复制内容的前maxInputs数量内容）（注意：一个页面使用多个本组件时不建议开启,因为此参数开启的组件均会触发粘贴填充；）  |  否 | Boolean  |  false |
| isMask  | 是否遮盖pin码  |  否 |  Boolean | true  |
| maskFlag  | pin码遮盖物（使用此参数时请开启isMask）  |  否 | String  |  '🙈' |
|  shape | 组件预设的输入框形状（有Box、Circle、Line共三种）  | 否  | String  | 'Box' |

最后希望小伙伴可以点个 ⭐，谢谢
