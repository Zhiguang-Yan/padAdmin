<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <el-dialog :title="props.title" v-model="dialogVisible">
    <el-scrollbar max-height="500px" always>
      <div class="container">
        <div
          class="icon_item"
          @click="handleClickItem(icon)"
          v-for="(icon, index) in Object.keys(ELIcons)"
          :key="index"
        >
          <div>
            <component :is="`el-icon-${toLine(icon)}`"></component>
          </div>
          <div>{{ icon }}</div>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as ELIcons from '@element-plus/icons'
import { toLine } from '@/utils'
import { useCopy } from '@/hooks/useCopy'
const props = defineProps<{
  title: string
  visible: boolean
}>()

let emits = defineEmits(['update:visible'])
let dialogVisible = computed({
  get: () => props.visible,
  set: (value) => {
    emits('update:visible', value)
  },
})
function handleClick() {
  emits('update:visible', !props.visible)
}
function handleClickItem(icon: string) {
  useCopy(icon)
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.icon_item {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  min-height: 70px;
}
svg {
  width: 2em;
  height: 2em;
}
</style>
