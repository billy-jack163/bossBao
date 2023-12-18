<template>
  <div class="category-content">
    <header>
      <p>{{ header?.title }}</p>
      <el-button type="primary" @click="handleNewUser" v-if="isCreate">{{
        header?.create ?? '新建数据'
      }}</el-button>
    </header>
    <el-table :data="pageList" border>
      <el-table-column type="selection" width="55" />
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <template v-for="item in pageLists" :key="item.prop">
        <template v-if="item.type === 'status'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              <el-button
                :type="scope.row.enable === 0 ? 'danger' : 'primary'"
                size="small"
                plain
              >
                {{ scope.row.enable === 0 ? '禁止' : '启用' }}
              </el-button>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'createTime'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              {{ formatUTC(scope.row.createAt) }}
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'updateTime'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              {{ formatUTC(scope.row.createAt) }}
            </template>
          </el-table-column>
        </template>
        <!-- <template v-else-if="item.type === 'custom'">
          <template #default="scope">
            <el-table-column align="center" v-bind="item">
              <slot :name="item.slotName" :row="scope.row"></slot>
            </el-table-column>
          </template>
        </template> -->
        <template v-else>
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              {{ scope.row[item.prop] }}
            </template>
          </el-table-column>
        </template>
      </template>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            v-if="isUpdate"
            icon="Edit"
            type="primary"
            text
            size="small"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="Delete"
            type="danger"
            text
            size="small"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import useAllow from '@/hooks/allow'
interface IProps {
  pageName: string
  header: {
    title: string
    create: string
  }
  pageLists: {
    prop: string
    label: string
    width?: string
    type?: string
    slotName?: string
  }[]
}
const useSystem = useSystemStore()
const { pageList, pageTotalCount } = storeToRefs(useSystem)
const prop = defineProps<IProps>()
const emit = defineEmits(['newEdit', 'newPage'])
// 0.获取是否有对应的增删改查的权限
const isCreate = useAllow(`system:${prop.pageName}:create`)
const isDelete = useAllow(`system:${prop.pageName}:delete`)
const isUpdate = useAllow(`system:${prop.pageName}:update`)
const isQuery = useAllow(`system:${prop.pageName}:query`)
// 初始化页面参数
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
// 解决删除,编辑,新建后无法跳转至首页的情况
useSystem.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
function handleSizeChange() {
  fetchNewPage()
}
function handleCurrentChange() {
  fetchNewPage()
}
// 页面跳转更新操作
function fetchNewPage(searchContent: any = {}) {
  if (!isQuery) return
  let size = pageSize.value
  let offset = (currentPage.value - 1) * size
  let queryInfo = { size, offset }
  const contentInfo = { ...searchContent, ...queryInfo }
  useSystem.postPageListAction(prop.pageName, contentInfo)
}
fetchNewPage()
// 新建用户
function handleNewUser() {
  emit('newPage')
}
// 编辑
function handleEdit(item: any) {
  emit('newEdit', item)
}
// 删除
function handleDelete(items: any) {
  useSystem.deletePageByIdAction(prop.pageName, items.id)
}
defineExpose({ fetchNewPage })
</script>

<style scoped lang="less">
.category-content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  header {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-weight: 700;
      font-size: 18px;
    }
  }
  .pagination {
    margin-top: 15px;
    display: flex;
    justify-content: end;
  }
}
</style>
