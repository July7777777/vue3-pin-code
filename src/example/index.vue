<template>
  <el-header>
    顶部内容
  </el-header>
  <div class="main">

    <el-row class="row-bg" justify="space-between">
      <el-col :span="10">
        <el-form :rules="rules" label-width="110px" :label-position="'right'">

          <el-form-item label="输入框数量" prop="maxInputs">
            <el-input-number v-model="form.maxInputs" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="输入框形状" prop="shape">
            <el-radio-group v-model="form.shape">
              <el-radio label="Box"></el-radio>
              <el-radio label="Circle"></el-radio>
              <el-radio label="Line"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否遮盖pin码" prop="isMask">
            <el-switch v-model="form.isMask" :onchange="OnChange(form.isMask, 'a')" active-color="#13ce66"
              inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="pin码遮盖物" prop="maskFlag">
            <el-input :disabled="!form.isMask" v-model="form.maskFlag" placeholder="请输入内容(请确认已开启 遮盖pin码)"></el-input>
          </el-form-item>
          <el-form-item label="是否允许粘贴" prop="isPaste">
            <el-switch v-model="form.isPaste" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-divider border-style="dashed"></el-divider>
          <el-form-item disabled label="组件唯一标识" prop="id">
            <el-input disabled placeholder="这里没有调试意义"></el-input>
          </el-form-item>
          <el-form-item disabled label="回调函数" prop="Fn">
            <el-input disabled type="textarea" :rows="2" placeholder="(arr) => {console.log(arr)}//这里没有调试意义"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
        <pinCode ref="childRef" :key="form.toString()" :max-inputs="form.maxInputs" :shape="form.shape"
          :isMask="form.isMask" :mask-flag="form.maskFlag" :isPaste="form.isPaste" :completeFn="completeFn" />
        数量：{{ form.maxInputs }}<br>
        形状：{{ form.shape }}<br>
        遮盖：{{ form.isMask }}<br>
        遮盖物：{{ form.maskFlag }}<br>
        粘贴：{{ form.isPaste }}<br><br>
        输出(入)结果：{{ form.result.length > 0 ? form.result : '' }}
      </el-col>
    </el-row>
    <div>
      <el-table :data="propsData" border style="width: 100%">
        <el-table-column prop="name" label="参数名称" width="150" />
        <el-table-column prop="describe" label="参数描述" />
        <el-table-column prop="require" label="是否必填" width="85" />
        <el-table-column prop="type" label="参数类型" width="85" />
        <el-table-column prop="value" label="默认值或示例" width="180" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElTable, ElTableColumn, ElDivider, ElHeader, ElRow, ElCol, ElForm, ElFormItem, ElSwitch, ElInput, ElInputNumber, ElRadioGroup, ElRadio } from 'element-plus'
  import 'element-plus/dist/index.css'
  import pinCode from '../components/pinCode.vue'
  import { reactive } from 'vue';
  import { ref } from "vue";

  let childRef = ref<InstanceType<typeof pinCode> | undefined>(undefined);
  console.log(childRef.value)
  const rules = {
    Fn: [
      { required: true, message: '请输入输入完成自动触发的回调函数', trigger: 'blur' },
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' },
    ],
  }
  const form = reactive({
    shape: 'Box' as "Box" | "Circle" | "Line",
    isMask: false,
    maskFlag: '',
    maxInputs: 4,
    isPaste: false,
    id: '',
    result: [] as string[],
  })
  const completeFn = (arr: string[]) => {
    form.result = arr
  }
  const OnChange = (e: any, p: any) => {
    console.log({ e, p })
    console.log(childRef)
  }
  const propsData = [
    {
      name: 'completeFn',
      describe: '完成输入时自动触发的回调函数(会返回一个数组)',
      require: '是',
      type: 'Function',
      value: '(arr) => {console.log(arr)}'
    },
    {
      name: 'maxInputs',
      describe: '输入框数量',
      require: '否',
      type: 'Number',
      value: 4
    },
    {
      name: 'id',
      describe: '组件唯一标识（一个页面使用多个本组件则建议使用）',
      require: '否',
      type: 'String',
      value: "''"
    },
    {
      name: 'isPaste',
      describe: '是否允许粘贴（只会粘贴复制内容的前maxInputs数量内容）（注意：一个页面使用多个本组件时不建议开启,因为此参数开启的组件均会触发粘贴填充；）',
      require: '否',
      type: 'Boolean',
      value: 'false'
    },
    {
      name: 'isMask',
      describe: '是否遮盖pin码',
      require: '否',
      type: 'Boolean',
      value: 'true'
    },
    {
      name: 'maskFlag',
      describe: 'pin码遮盖物（使用此参数时请开启isMask）',
      require: '否',
      type: 'String',
      value: "'🙈'"
    },
    {
      name: 'shape',
      describe: '组件预设的输入框形状（有Box、Circle、Line共三种）',
      require: '否',
      type: 'String',
      value: "'Box'"
    },
  ]
</script>
<style scoped>
  .main {
    margin: 0 80px 40px;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    padding: 20px;
    border: 1px solid #DCDFE6;

    /* background-color: #d3d3d3b2; */
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
    /* border: 1px solid #DCDFE6; */
  }
</style>