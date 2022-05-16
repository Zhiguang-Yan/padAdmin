<template>
  <span class="arrow_container" @click="emits('update:value', !value)">
    {{ props.value ? '收起' : '展开' }}
    <el-icon class="arrow"
      ><ArrowDown :class="props.value ? 'up' : 'dowm'"
    /></el-icon>
  </span>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons'

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
})
const emits = defineEmits(['update:value'])
</script>

<style lang="scss" scoped>
.arrow_container {
  cursor: default;
  font-size: 14px;
  margin-left: 8px;
}
.arrow {
  height: auto;
  padding: 0;
  width: auto;
  vertical-align: middle;
  .dowm {
    transform: rotate(0deg);
    transition: all 0.3s;
  }
  .up {
    transform: rotate(180deg);
    transition: all 0.3s;
  }
}
</style>
