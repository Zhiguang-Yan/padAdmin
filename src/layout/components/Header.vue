<template>
  <div class="header-container clearfix">
    <div class="left-menu">
      <Hamburger v-model:collapse="collapse" />
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
      <Logout class="right-menu-item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { list, actions } from '@/views/notificition/data'
import { ListOptions } from '@/components/list/src/type'
import Hamburger from '@/components/Hamburger'
import Logout from '@/components/Logout'
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
  width: 100%;
  .expand {
    cursor: pointer;
  }
  .left-menu {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .mr {
    margin-right: 60px;
  }
  .right-menu-item {
    display: inline-block;
    padding: 0 16px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>