<template>
  <div>
    <el-radio-group v-model="mode">
      <el-radio label="vertical">左右布局</el-radio>
      <el-radio label="horizontal">上下布局</el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue-demi'
const appStore = useAppStore()
const mode = computed({
  get: () => appStore.mode,
  set: (value) => appStore.toggleMode(value),
})
</script>

<style scoped>
</style>