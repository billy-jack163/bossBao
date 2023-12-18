<template>
  <div class="category">
    <categorySearch
      v-bind="category"
      @new-query="newQuery"
      @new-reset="newReset"
    ></categorySearch>
    <categoryContent
      @new-edit="newEdit"
      @new-page="newPage"
      v-bind="listContent"
      ref="contentRef"
    ></categoryContent>
    <categoryModal
      ref="modalRef"
      v-bind="pageModalContent"
      :otherInfo="otherInfo"
    >
      <template #role="item">
        <el-select v-model="item.row[item.row2.prop]" style="width: 100%">
          <template v-for="item in entireRoles" :key="item.id">
            <el-option :label="item.name" :value="item.id"></el-option>
          </template>
        </el-select>
      </template>
      <template #department="item">
        <el-select v-model="item.row[item.row2.prop]" style="width: 100%">
          <template v-for="item in entireDepartments" :key="item.id">
            <el-option :label="item.name" :value="item.id"></el-option>
          </template>
        </el-select>
      </template>
    </categoryModal>
  </div>
</template>

<script setup lang="ts">
import categorySearch from '@/components/category-search/category-search.vue'
import category from '@/views/main/product/category/config/category-search'

import categoryContent from '@/components/category-content/category-content.vue'
import listContent from '@/views/main/product/category/config/category-content'

import categoryModal from '@/components/category-modal/category-modal.vue'
import pageModalContent from '@/views/main/product/category/config/category-modal'
import useMainStore from '@/store/main/main'

import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onBeforeRouteLeave } from 'vue-router'

const useMain = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(useMain)
const contentRef = ref<InstanceType<typeof categoryContent>>()
const modalRef = ref<InstanceType<typeof categoryModal>>()
const otherInfo = {
  type: 'input',
  prop: 'password',
  label: '密码',
  placeholder: '请输入密码'
}

// 查询
function newQuery(item: any) {
  contentRef.value?.fetchNewPage(item)
}
onBeforeRouteLeave((to, from, next) => {})
//重置
function newReset() {
  contentRef.value?.fetchNewPage()
}
// 编辑
function newEdit(item: any) {
  modalRef.value?.newEdituser(false, item)
}
// 新建
function newPage() {
  modalRef.value?.newEdituser(true)
}
</script>

<style scoped></style>
