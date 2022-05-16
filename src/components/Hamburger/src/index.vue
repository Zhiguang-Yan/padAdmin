<template>
  <span class="expand" @click="emits('update:collapse', !collapse)">
    <el-icon-expand v-if="collapse" />
    <el-icon-fold v-else />
  </span>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:collapse'])
</script>

<style scoped lang="scss">
span.expand {
  padding: 0;
}
svg {
  width: 1.3em;
  height: 1.3em;
  vertical-align: middle;
}
</style>
