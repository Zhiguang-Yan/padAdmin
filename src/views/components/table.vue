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
    label: '手机号',
    prop: 'phone',
    placeholder: '请输入手机号',
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: null,
    label: '账户',
    prop: 'account',
    placeholder: '请输入账号',
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'select',
    value: null,
    label: '状态',
    prop: 'status',
    attrs: {
      filterable: true,
    },
    children: [
      {
        type: 'option',
        label: '启用',
        value: 1,
      },
      {
        type: 'option',
        label: '禁用',
        value: 2,
      },
    ],
  },
  {
    type: 'select',
    value: null,
    prop: 'moduleId',
    placeholder: '请选择',
    label: '操作模块',
    children: [
      {
        type: 'option',
        label: '房态模块',
        value: 1,
      },
      {
        type: 'option',
        label: '订单模块',
        value: 2,
      },
      {
        type: 'option',
        label: '业务模块',
        value: 3,
      },
      {
        type: 'option',
        label: '客户模块',
        value: 4,
      },
      {
        type: 'option',
        label: '数据模块',
        value: 5,
      },
      {
        type: 'option',
        label: '设置模块',
        value: 6,
      },
      {
        type: 'option',
        label: '门店模块',
        value: 7,
      },
    ],
    attrs: {
      filterable: true,
    },
  },
  {
    type: 'date-picker',
    value: null,
    label: '操作时间',
    prop: 'date',
    attrs: {
      type: 'daterange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      rangeSeparator: '至',
      shortcuts: [
        {
          text: '最近一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
      ],
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      'disabled-date': (time: Date) => {
        return time.getTime() > Date.now()
      },
    },
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
