<template>
  <div class="category-search" v-if="isQuery">
    <el-form :model="searchList" label-width="80" ref="formRef">
      <el-row :gutter="30">
        <template v-for="item in propsList" :key="item.props">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.props">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchList[item.props]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchList[item.props]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option label="禁止" :value="0"></el-option>
                  <el-option label="启动" :value="1"></el-option>
                </el-select>
              </template>
              <template v-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="searchList[item.props]"
                  type="daterange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import useAllow from '@/hooks/allow'
interface Prop {
  type: string
  props: string
  label: string
  placeholder?: string
}

interface IProps {
  pageName: string
  labelWidth?: string
  propsList: Prop[]
}
const props = defineProps<IProps>()
const emit = defineEmits(['newReset', 'newQuery'])
const formRef = ref<InstanceType<typeof ElForm>>()
const isQuery = useAllow(`${props.pageName}:query`)
//动态获取初始化参数
let searchList = reactive<any>({})
props.propsList.forEach((item: any) => {
  searchList[item.props] = ''
})

function handleResetClick() {
  formRef.value?.resetFields()
  emit('newReset')
}
function handleQueryClick() {
  emit('newQuery', searchList)
}
</script>

<style scoped lang="less">
.category-search {
  background-color: #fff;
  padding: 20px;
  .btns {
    text-align: right;
  }
  .el-form-item {
    padding: 10px;
  }
}
</style>
