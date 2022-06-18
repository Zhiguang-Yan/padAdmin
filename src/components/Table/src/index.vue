<template>
  <template v-if="useQuery && queryOptions.length">
    <pac-form
      ref="acForm"
      :options="queryOptions"
      :layout="layout"
      class="query__form__header"
      :label-width="labelWidth"
    >
      <template #submit>
        <div class="action__warpper">
          <span>
            <el-button type="primary" @click="fetchData">查询</el-button
            ><el-button @click="handleReset">重置</el-button></span
          >
          <span v-if="$slots.action">
            <slot name="action"></slot>
          </span>
        </div>
      </template>
    </pac-form>
    <el-divider class="pad-divider"></el-divider>
  </template>
  <el-table
    v-loading="fetching"
    max-height="600px"
    :data="tableData"
    v-bind="$attrs.table"
  >
    <slot></slot>
  </el-table>
  <pac-pagination
    v-if="usePagination"
    v-model:page="query.currentPage"
    v-model:limit="query.pageSize"
    :total="totalNum"
    @pagination="fetchData"
  />
</template>
<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import type { FormOptions, Ilayout } from '@/components/Form/src/type'

export interface IProps {
  layout?: Ilayout
  queryOptions?: FormOptions
  usePagination?: boolean
  useQuery?: boolean
  labelWidth?: string
  // eslint-disable-next-line no-unused-vars
  fetchApi: (query: Record<string, any>) => Promise<any>
}

const props = withDefaults(defineProps<IProps>(), {
  layout: () => ({ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }),
  useQuery: true,
  queryOptions: () => [],
  usePagination: true,
  labelWidth: 'auto',
})

const DEFAULT_PAGINATION = { currentPage: 1, pageSize: 10 }
const acForm = ref<Ref | null>(null)
const tableData = ref<any>([])
const totalNum = ref<number>(0)
const query = reactive({
  ...DEFAULT_PAGINATION,
})
const fetching = ref<boolean>(false)
async function fetchData() {
  try {
    const params = acForm.value
      ? { ...acForm.value.getModel(), ...query }
      : { ...query }
    fetching.value = true
    console.log('🌰', params)
    const { data } = await props.fetchApi(params)
    const { list = [], total = 0 } = data
    tableData.value = list
    totalNum.value = total
  } catch (error) {
    console.error(error)
  }
  fetching.value = false
}

function handleReset() {
  acForm.value!.formRef.resetFields()
  query.currentPage = 1
  query.pageSize = 10
  fetchData()
}
defineExpose({ fetchData })
</script>
<style lang="scss" scoped>
.el-table {
  color: #222222;
}
.pad-divider {
  margin-top: 0;
}
.query__form__header {
  padding-top: 4px;
  ::v-deep(div.el-form-item) {
    // margin-bottom: 0;
    // padding: 0;
  }
  .action__warpper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    white-space: nowrap;
  }
}
</style>
