<template>
  <div class="trend_container">
    <div class="trend_text">
      <slot v-if="slots.default" />
      <span v-else>{{ text }}</span>
    </div>
    <div class="trend_icon">
      <component
        v-if="type === 'up'"
        :is="`el-icon-${toLine(upIcon)}`"
        :style="{ color: upIconColor }"
      ></component>
      <component
        v-else
        :is="`el-icon-${toLine(downIcon)}`"
        :style="{ color: downIconColor }"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import { toLine } from '@/utils'
const slots = useSlots()
const props = defineProps({
  type: {
    type: String,
    default: () => 'up',
  },
  text: {
    type: String,
    default: () => '',
  },
  upIconColor: {
    type: String,
    default: () => '#f5222d',
  },
  upIcon: {
    type: String,
    default: () => 'caretTop',
  },
  downIcon: {
    type: String,
    default: () => 'caretBottom',
  },
  downIconColor: {
    type: String,
    default: () => '#52c41a',
  },
})
</script>

<style scoped lang="scss">
.trend_container {
  display: flex;
  align-items: center;
  .trend_text {
    font-size: 14px;
    margin-right: 4px;
    vertical-align: middle;
  }
  .trend_icon {
    svg {
      width: 1em;
      height: 1em;
    }
  }
}
</style>