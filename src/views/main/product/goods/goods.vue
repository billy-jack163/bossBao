<template>
  <div class="goods">
    <GoodSearch
      @reset-click="resetClick"
      @query-click="queryClick"
    ></GoodSearch>
    <GoodContent
      ref="contentRef"
      @new-click="newClick"
      @edit-click="editClick"
    ></GoodContent>
    <GoodModal ref="modalRef"></GoodModal>
  </div>
</template>

<script setup lang="ts">
import GoodSearch from '@/views/main/product/goods/cpns/good-search.vue'

import GoodContent from '@/views/main/product/goods/cpns/good-content.vue'

import GoodModal from '@/views/main/product/goods/cpns/good-modal.vue'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof GoodContent>>()
// 重置
function resetClick() {
  contentRef.value?.fetchPage()
}
// 查询
function queryClick(goodItems: any) {
  contentRef.value?.fetchPage(goodItems)
}
const modalRef = ref<InstanceType<typeof GoodModal>>()
// 编辑
function editClick(items: any) {
  modalRef.value?.modalContentRender(false, items)
}
// 新建用户
function newClick() {
  modalRef.value?.modalContentRender(true)
}
</script>

<style scoped>
.goods {
}
</style>
