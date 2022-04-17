<template>
  <div class="container_badge">
    <el-popover placement="bottom" popper-class="pad-popover" width="300px" trigger="click">
      <template #default>
        <slot></slot>
      </template>
      <template #reference>
        <el-badge :value="value" :max="max" :is-dot="isDot">
          <component :is="`el-icon-${toLine(icon)}`"></component>
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { toLine } from '@/utils'
import { ref } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    default: () => 'Bell',
  },
  value: {
    type: [String, Number],
    default: () => '',
  },
  max: {
    type: Number,
  },
  isDot: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.container_badge {
  display: inline-block;
  cursor: pointer;

  svg {
    width: 1em;
    height: 1em;

  }
}
</style>