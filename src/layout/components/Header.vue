<template>
  <div class="header-container">
    <div class="left-menu flex-c">
      <pac-hamburger v-model:collapse="collapse" />
      <pac-breadcrumb />
    </div>

    <div class="right-menu">
      <pac-notificition class="right-menu-item" :value="value">
        <template #default>
          <pac-list
            :list="dataList"
            :actions="actions"
            @clickItem="clickItem"
            @clickAction="clickAction"
          ></pac-list>
        </template>
      </pac-notificition>
      <pac-logout class="right-menu-item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { list, actions } from '@/views/components/data'
import { ListOptions } from '@/components/list/src/type'
import { useAppStore } from '@/store/modules/app'
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

const appStore = useAppStore()
const collapse = computed({
  get: () => appStore.isCollapsed,
  set: (value: boolean) => {
    appStore.toggle()
  },
})
</script>

<style scoped lang="scss">
.header-container {
  position: relative;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  .expand {
    cursor: pointer;
  }
  .left-menu {
  }
  .right-menu {
    display: flex;
    align-items: center;
  }
  .mr {
    margin-right: 60px;
  }
  .right-menu-item + .right-menu-item {
    margin-left: 32px;
  }
  .right-menu-item {
    display: inline-block;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
  }
}
</style>
