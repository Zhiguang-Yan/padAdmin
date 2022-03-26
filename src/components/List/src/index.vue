<template>
  <el-tabs class="pad-tabs" v-model="curIndex">
    <el-tab-pane
      v-for="(item, index) in list"
      :key="index"
      :value="index"
      :label="`${item.title}${
        item.content.filter((v) => !v.isRead).length
          ? '(' + item.content.filter((v) => !v.isRead).length + ')'
          : ''
      }`"
    >
      <el-scrollbar max-height="300px">
        <div
          class="container"
          v-for="(listItem, listIndex) in item.content"
          :key="listIndex"
          @click="clickItem(listItem, listIndex)"
          :class="{ is__read: listItem.isRead }"
        >
          <div class="avatar" v-if="listItem.avatar">
            <el-avatar :size="32" :src="listItem.avatar" />
          </div>
          <div class="content">
            <div class="title" v-if="listItem.title">
              <div>{{ listItem.title }}</div>
              <el-tag
                v-if="listItem.tagType"
                size="small"
                :type="listItem.tagType"
                >{{ listItem.tag }}</el-tag
              >
            </div>
            <div class="time" v-if="listItem.desc">{{ listItem.desc }}</div>
            <div class="time" v-if="listItem.time">{{ listItem.time }}</div>
          </div>
        </div>
      </el-scrollbar>
      <div class="actions">
        <div
          class="a-item"
          v-for="(action, j) in actions"
          :key="j"
          :class="{ border: j !== actions.length }"
          @click="clickAction(action, action.text.startsWith('清空'))"
        >
          <div class="a-icon" v-if="action.icon">
            <component :is="`el-icon-${toLine(action.icon)}`"></component>
          </div>
          <div class="a-text">
            {{
              `${action.text}${
                action.text.startsWith('清空') ? ' ' + item.title : ''
              }`
            }}
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { PropType, ref } from 'vue'
import { toLine } from '@/utils'
// @ts-ignore
import { ActionOptions, ListOptions, ListItem } from './type'
const props = defineProps({
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true,
  },
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => [],
  },
})
const emits = defineEmits(['clickItem', 'clickAction'])
const curIndex = ref<number>(0)
const clickItem = (list: ListItem, listIndex: number) => {
  emits('clickItem', { list, curIndex: curIndex.value, listIndex })
}
const clickAction = (item: ActionOptions, isClear: boolean) => {
  ElMessage({
    message: isClear
      ? `清空了 ${props.list[curIndex.value].title}`
      : 'Click on view more',
    type: isClear ? 'success' : 'info',
  })
  emits('clickAction', { item, curIndex: curIndex.value })
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;

  cursor: pointer;
  &:hover {
    background: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.is__read {
  opacity: 0.4;
}
.actions {
  height: 50px;
  display: flex;
  align-content: center;
  border-top: 1px solid #eee;
  .a-item {
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}
.border {
  border-right: 1px solid #eee;
}
</style>
