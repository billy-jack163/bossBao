<template>
  <div class="good-content">
    <header>
      <p>用户列表</p>
      <el-button type="primary" @click="handleNewUser">新建用户</el-button>
    </header>
    <div class="content">
      <el-table :data="usersList" border width="140">
        <el-table-column type="selection" width="55" />
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="真实姓名"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="cellphone"
          label="手机号码"
          width="140"
        ></el-table-column>
        <el-table-column prop="enable" label="状态" width="100" align="center">
          <template #default="scope">
            <el-button
              size="small"
              plain
              :type="scope.row.enable === 1 ? 'primary' : 'danger'"
            >
              {{ scope.row.enable === 1 ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="createAt"
          align="center"
          width="380"
          label="创建时间"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateAt"
          align="center"
          width="380"
          label="更新时间"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              icon="Edit"
              type="primary"
              text
              size="small"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
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
    </div>
    <div class="content-bottom">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { formatUTC } from '@/utils/format'
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const useSystem = useSystemStore()
const { usersList, usersTotalCount } = storeToRefs(useSystem)
console.log(usersList)
// 将scope.row的信息渲染至编辑框或者不渲染
const emit = defineEmits(['editClick', 'newClick'])
// pageSize改变时触发
function handleCurrentChange() {
  fetchPage()
}
// currentPage改变时触发
function handleSizeChange() {
  fetchPage()
}
// 页面请求封装
function fetchPage(searchContent: any = {}): void {
  let size = pageSize.value
  let offset = (currentPage.value - 1) * size
  let pageInfo = { offset, size }
  const query = { ...searchContent, ...pageInfo }
  useSystem.postUsersListAction(query)
}
// 执行该函数实现渲染效果
fetchPage()
function handleNewUser() {
  emit('newClick')
}
function handleEdit(items: any) {
  emit('editClick', items)
}
// 删除操作
function handleDelete(items: any) {
  useSystem.deleteUserByIdAction(items.id)
}
defineExpose({ fetchPage })
</script>

<style lang="less" scoped>
.good-content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-weight: 700;
      font-size: 18px;
    }
  }

  .content {
    margin-top: 10px;
  }
  .content-bottom {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: end;
  }
}
</style>
