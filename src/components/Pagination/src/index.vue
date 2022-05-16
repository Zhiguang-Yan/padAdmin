<template>
  <div class="pagination-container clearfix">
    <el-pagination
      v-bind="$attrs"
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      class="fr"
      hide-on-single-page
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      background
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  layout: {
    type: String,
    default: 'total,sizes,prev, pager, next, jumper'
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 50]
  }
})
const emits = defineEmits(['update:page', 'update:limit', 'pagination'])
const currentPage = computed({
  get: () => props.page,
  set: (value) => {
    emits('update:page', value)
  }
})

const pageSize = computed({
  get: () => props.limit,
  set: (value) => {
    emits('update:limit', value)
  }
})
function sizeChange(value: number) {
  emits('pagination', { page: currentPage.value, limit: value })
}

function currentChange(value: number) {
  emits('pagination', { page: value, limit: pageSize.value })
}
</script>

<style lang="scss">
.pagination-container {
  padding-top: 30px;
}
</style>
