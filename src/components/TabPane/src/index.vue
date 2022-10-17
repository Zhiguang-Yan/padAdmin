<template>
  <div v-show="parentModelValue === name">
    <slot></slot>
    <slot name="label"></slot>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, computed } from 'vue'
export interface PropsTabPane {
  label: string
  disabled?: boolean
  name: string | number
}
const props = withDefaults(defineProps<PropsTabPane>(), {
  name: 0,
})

const parentModelValue = computed(
  () => getCurrentInstance()!.parent!.props.value
)
</script>

<style lang="scss" scoped></style>
