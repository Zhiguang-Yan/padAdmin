<template>
  <div>
    <pac-choose-icon title="选择标题" v-model:visible="visible"
      >选择图标</pac-choose-icon
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref<boolean>(false)
</script>

<style scoped lang="scss"></style>
