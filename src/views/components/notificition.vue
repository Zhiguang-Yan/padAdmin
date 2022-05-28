<template>
  <div>
    <pac-notificition :value="value">
      <template #default>
        <pac-list
          :list="dataList"
          :actions="actions"
          @clickItem="clickItem"
          @clickAction="clickAction"
        ></pac-list>
      </template>
    </pac-notificition>
  </div>
</template>

<script setup lang="ts">
import { list, actions } from './data'
import { ListOptions } from '@/components/list/src/type'
import { ref, computed } from 'vue'
const dataList = ref<ListOptions[]>(list as ListOptions[])
const clickItem = (value: any) => {
  const { list, curIndex, listIndex } = value
  !list.isRead && (dataList.value[curIndex].content[listIndex].isRead = true)
}
const clickAction = (value: any) => {
  const {
    item: { text },
    curIndex,
  } = value
  const data = dataList.value[curIndex].content
  text.startsWith('清空') &&
    (dataList.value[curIndex].content = data.map((v) => {
      v.isRead = true
      return v
    }))
}
const value = computed(() =>
  dataList.value
    .map((item) => item.content.length)
    .reduce((pre, cur) => pre + cur)
)
</script>

<style scoped lang="scss"></style>
