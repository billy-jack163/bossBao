<template>
  <div class="good-search">
    <el-form :model="goodItems" label-width="80px" type="large" ref="formRef">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="goodItems.name"
              placeholder="请输入查询的用户名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="goodItems.realname"
              placeholder="请输入查询的真实姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="goodItems.cellphone"
              placeholder="请输入查询的手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="goodItems.enable"
              placeholder="请选择查询的状态"
              style="width: 100%"
            >
              <el-option label="禁止" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="goodItems.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="handle">
      <el-button type="default" @click="resetContent"> 重置 </el-button>
      <el-button type="primary" @click="queryContent">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
const goodItems = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})
const emit = defineEmits(['resetClick', 'queryClick'])
const formRef = ref<InstanceType<typeof ElForm>>()
// 重置
function resetContent() {
  formRef.value?.resetFields()
  emit('resetClick')
}
// 查询
function queryContent() {
  emit('queryClick', goodItems)
}
</script>

<style scoped lang="less">
.good-search {
  background-color: #fff;
  padding: 20px;
  .handle {
    text-align: right;
  }
  .el-form-item {
    padding: 10px 0;
  }
}
</style>
