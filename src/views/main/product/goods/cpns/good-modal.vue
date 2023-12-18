<template>
  <div class="good-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <el-form :model="renderContent" label-width="80px" size="large">
        <el-form-item prop="name" label="用户名">
          <el-input
            v-model="renderContent.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="realname" label="真实姓名">
          <el-input
            v-model="renderContent.realname"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="renderContent.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="cellphone" label="手机号码">
          <el-input
            v-model="renderContent.cellphone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select
            v-model="renderContent.roleId"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item prop="departmentId" label="部门">
          <el-select v-model="renderContent.departmentId" style="width: 100%">
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="handleModalContent">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
// 初始化参数
let renderContent = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const initRenderContent = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
let id = 0
const isNewRef = ref<boolean>(true)
const dialogVisible = ref<boolean>(false)

const useMain = useMainStore()
const { entireDepartments, entireRoles } = storeToRefs(useMain)
const useSystem = useSystemStore()

function modalContentRender(isModal: boolean = false, modalContent?: any) {
  dialogVisible.value = true
  isNewRef.value = isModal
  if (isNewRef.value === false && modalContent) {
    Object.keys(renderContent).forEach((key) => {
      // eslint-disable-next-line no-prototype-builtins
      if (modalContent.hasOwnProperty(key)) {
        renderContent[key] = modalContent[key]
      }
      id = modalContent.id
    })
  } else {
    // Object.assign函数是在修改renderContent，而renderContent = { ...initRenderContent }是创建了一个全新的对象
    Object.assign(renderContent, initRenderContent)
  }
}

function handleModalContent() {
  dialogVisible.value = false
  if (isNewRef.value === false) {
    useSystem.editUserDataAction(id, renderContent)
  } else {
    useSystem.newUserDataAction(renderContent)
  }
}

defineExpose({ modalContentRender })
</script>

<style lang="less" scoped>
.good-modal {
}
</style>
