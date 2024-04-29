<template>
  <el-header>
    顶部内容
  </el-header>
  <div>
    | completeFn | 完成输入时的回调函数 | 是 | Function | () => ([]) => { } |
    | maxInputs | 输入框数量 | 否 | Number | 4 |
    | id | 组件唯一标识（一个页面使用多个本组件则建议使用） | 否 | String | '' |
    | isPaste | 是否允许粘贴（只会粘贴复制内容的前maxInputs数量内容）（注意：一个页面使用多个本组件时不建议开启,因为此参数开启的组件均会触发粘贴填充；） | 否 | Boolean | false |
    | isMask | 是否遮盖pin码 | 否 | Boolean | true |
    | maskFlag | pin码遮盖物（使用此参数时请开启isMask） | 否 | String | '🙈' |
    | shape | 组件预设的输入框形状（有Box、Circle、Line共三种） | 否 | String | 'Box' |
    <el-row class="row-bg" justify="space-around">
      <el-col :span="6">
        <el-form :rules="rules">
          <el-form-item label="回调函数" prop="completeFn">
            <el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="输入框数量" prop="maxInputs">
            <el-input-number :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="输入框形状" prop="shape">
            <el-radio-group v-model="form.shape">
              <el-radio label="Box"></el-radio>
              <el-radio label="Circle"></el-radio>
              <el-radio label="Line"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="组件唯一标识" prop="id">

          </el-form-item>
          <el-form-item label="是否允许粘贴" prop="isPaste">

          </el-form-item>
          <el-form-item label="是否遮盖pin码" prop="isMask">
            <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="pin码遮盖物" prop="maskFlag">

          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">2</div>
      </el-col>
    </el-row>
    <el-button>aaaa</el-button>
    aaaaa
  </div>
  <pinCode id="1" ref="childRef" shape="Box" :isMask="false" :completeFn="() => { }" />
  <!-- <pinCode id="2" ref="childRef" shape="Circle" :isMask="false" :completeFn="onComplete" />
  <pinCode id="3" ref="childRef" shape="Line" :isMask="false" :completeFn="onComplete" />
  <pinCode ref="childRef" shape="Line" :isMask="true" :completeFn="onComplete" />
  <pinCode id=" 6 " ref="childRef" shape="Line" :isMask="true" :completeFn="onComplete" /> -->
  <!-- <button @click="handler">aa</button> -->
</template>

<script setup lang="ts">
  import { ElButton, ElHeader, ElRow, ElCol, ElForm, ElFormItem, ElSwitch, ElInput, ElInputNumber, ElRadioGroup, ElRadio } from 'element-plus'
  import 'element-plus/dist/index.css'
  import pinCode from '../components/pinCode.vue'
  import { reactive } from 'vue';
  // import { ref } from "vue";
  // // let childRef = ref<InstanceType<typeof pinCode> | undefined>(undefined);
  // const onComplete = (pin: Array<string>) => {
  //   console.log(pin)
  // }
  const rules = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      {
        min: 3,
        max: 5,
        message: '长度在 3 到 5 个字符',
        trigger: 'blur',
      },
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' },
    ],
  }
  const form = reactive({
    shape: 'Box',
    isMask: true,
    maskFlag: '',
    maxInputs: 4,
    isPaste: false,
    id: '',
    completeFn: () => { }
  })
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>