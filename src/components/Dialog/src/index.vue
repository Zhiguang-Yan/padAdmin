<template>
  <el-dialog v-model="dialogVisible" width="30%" v-bind="$attrs">
    <slot></slot>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">{{ $attrs.canceltext || '取消' }}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{
          $attrs.submittext || '确定'
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    defalut: false
  }
})
const emits = defineEmits(['update:visible'])
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => {
    emits('update:visible', val)
  }
})
</script>

<style></style>
