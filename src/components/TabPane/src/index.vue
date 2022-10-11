<template>
  <div>
    <slot></slot>
    <slot name="label"></slot>
  </div>
</template>
<script setup lang="ts">
export interface PropsTabPane {
  label: string
  disabled?: boolean
  name: string | number
}
const props = withDefaults(defineProps<PropsTabPane>(), {
  name: 0,
})
</script>

<style lang="scss" scoped></style>
