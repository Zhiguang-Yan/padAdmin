<template>
  <div class="dashboard">
    <pac-table ref="actable" :fetch-api="getData" :query-options="options">
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" />
      <el-table-column prop="zip" label="Zip" />
      <el-table-column fixed="right" label="Operations">
        <template #default="{ row }">
          <el-space>
            <span @click="handleEdit(row)" class="t-danger">Detail</span>
            <el-divider direction="vertical"></el-divider>
            <span class="t-primary">Edit</span>
          </el-space>
        </template>
      </el-table-column>
    </pac-table>
    <pac-dialog
      v-model:visible="dialogVisAble"
      title="修改"
      @close="handleClose"
    >
      {{ detail.date }}
    </pac-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { FormOptions } from '@/components/Form/src/type'

const actable = ref<any>(null)
const dialogVisAble = ref<boolean>(false)
const options: FormOptions = [
  {
    type: 'input',
    value: null,
    prop: 'usename',
    label: '用户名',
    placeholder: '请输入用户名',
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: null,
    prop: 'usename',
    label: '用户名',
    placeholder: '请输入用户名',
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: null,
    prop: 'usename',
    label: '用户名',
    placeholder: '请输入用户名',
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: null,
    prop: 'usename',
    label: '用户名',
    placeholder: '请输入用户名',
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: null,
    prop: 'usename',
    label: '用户名',
    placeholder: '请输入用户名',
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'select',
    value: null,
    prop: 'job',
    placeholder: '请选择职位',
    label: '职位',
    attrs: {
      filterable: true,
      clearable: true,
    },
    children: [
      {
        type: 'option',
        value: 1,
        label: '经理',
      },
      {
        type: 'option',
        value: 2,
        label: '主管',
      },
      {
        type: 'option',
        value: 3,
        label: '员工',
      },
    ],
  },
]
const detail = ref<any>()
function handleEdit(row: any) {
  detail.value = row
  dialogVisAble.value = true
}
function handleClose() {
  tableRefresh()
}

const list = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
function getData() {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list,
          total: 100,
        },
      })
    }, 1000)
  })
}
function tableRefresh() {
  actable.value && actable.value.fetchData()
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
  tableRefresh()
})
</script>

<style lang="scss" scoped>
.dashboard {
  // height: 10000px;
}
</style>
