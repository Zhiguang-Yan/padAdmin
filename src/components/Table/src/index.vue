<template>
  <template v-if="useQuery && queryOptions.length">
    <pac-form
      ref="acForm"
      :options="queryOptions"
      :label-width="labelWidth"
      class="query__form__header"
    >
      <template #submit>
        <div class="clearfix" style="width: 100%">
          <span class="fl">
            <el-button type="primary" @click="fetchData">查询</el-button
            ><el-button @click="handleReset">重置</el-button></span
          >
          <span v-if="$slots.action" class="fr">
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
    style="width: 100%"
    :header-row-style="{
      background: '#F6F6F6',
      height: '52px',
      color: '#222222',
    }"
    :header-cell-style="{ background: '#F6F6F6' }"
    :row-style="{ height: '52px' }"
    v-bind="$attrs.table"
  >
    <slot></slot>
  </el-table>
  <pac-pagination
    v-if="usePagination"
    v-model:page="query.page"
    v-model:limit="query.pageSize"
    :total="totalNum"
    @pagination="fetchData"
  />
</template>
<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import type { FormOptions, Ilayout } from '../../Form/src/type'
export interface IProps {
  layout?: Ilayout
  queryOptions?: FormOptions
  usePagination?: boolean
  useQuery?: boolean
  labelWidth?: string
  // eslint-disable-next-line no-unused-vars
  fetchApi: <T = any>(query: Record<string, any>) => Promise<T>
}

const props = withDefaults(defineProps<IProps>(), {
  layout: () => ({ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }),
  useQuery: true,
  queryOptions: () => [],
  usePagination: true,
  labelWidth: 'auto',
})

const DEFAULT_PAGINATION = { page: 1, pageSize: 10 }
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
    console.log(error)
  }
  fetching.value = false
}

function handleReset() {
  acForm.value!.formRef.resetFields()
  query.page = 1
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
}
</style>
