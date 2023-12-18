<template>
  <div class="category-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="title ?? '新建操作'"
      width="30%"
      center
    >
      <el-form :model="modalContent" :label-width="labelWidth">
        <template v-for="item in ModalLists" :key="item.prop">
          <!-- <el-form-item v-bind="item"> -->
          <template v-if="item.type === 'input'">
            <el-form-item v-bind="item">
              <el-input
                v-model="modalContent[item.prop]"
                :placeholder="item.placeholder"
              ></el-input>
            </el-form-item>
          </template>
          <template v-if="item.type === 'password' && isNewUser === true">
            <el-form-item v-bind="item">
              <el-input
                type="password"
                v-model="modalContent[item.prop]"
                :placeholder="item.placeholder"
              ></el-input>
            </el-form-item>
          </template>
          <template v-if="item.type === 'custom'">
            <el-form-item v-bind="item">
              <slot
                :name="item.slotName"
                :row="modalContent"
                :row2="item"
              ></slot>
            </el-form-item>
          </template>
          <!-- </el-form-item> -->
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="modifyContent"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import useSystemStore from '@/store/main/system/system'

interface ModalList {
  pageName: string
  labelWidth: string
  title?: string
  ModalLists: {
    type: string
    prop: string
    label?: string
    placeholder?: string
    slotName?: string
  }[]
  otherInfo: {
    type: string
    prop: string
    label: string
    placeholder?: string
  }
}
const useSystem = useSystemStore()
const prop = defineProps<ModalList>()
const modalContent = reactive<any>({})
const id = ref<number>(0)
for (let item of prop.ModalLists) {
  modalContent[item.prop] = ''
}

let modalContentCopy = reactive<any>({})
Object.assign(modalContentCopy, modalContent)
let centerDialogVisible = ref<boolean>(false)
let isNewUser = ref<boolean>(false)
// 新建用户或者编辑操作
function newEdituser(isNew: boolean = false, item: any = {}) {
  isNewUser.value = isNew
  centerDialogVisible.value = true
  if (item && isNewUser.value === false) {
    id.value = item.id
    Object.keys(modalContent).forEach((key) => {
      // eslint-disable-next-line no-prototype-builtins
      if (modalContent.hasOwnProperty(key)) {
        modalContent[key] = item[key]
      }
    })
  } else {
    nextTick(() => {
      Object.assign(modalContent, modalContentCopy)
    })
  }
}
// 修改编辑操作
function modifyContent() {
  centerDialogVisible.value = false
  console.log(modalContent)
  // let infoData = modalContent
  // if (prop.otherInfo) {
  //   infoData = { ...infoData, ...prop.otherInfo }
  // }
  if (!isNewUser.value) {
    // 编辑用户的数据
    useSystem.editPageDataAction(prop.pageName, id.value, modalContent)
  } else {
    // 创建新的部门
    useSystem.newPageDataAction(prop.pageName, modalContent)
  }
}
defineExpose({ newEdituser })
</script>

<style scoped lang="less"></style>
