<template>
  <div>
    <pac-choose-time v-model:start="startTime" v-model:end="endTime" />
    <el-button type="success">success</el-button>
    <el-button type="warning">warning</el-button>
    <el-button type="danger">danger</el-button>
    <el-button type="primary">primary</el-button>
    <el-button type="info">info</el-button>
    <el-button type="default">default</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const startTime = ref<string | null>(null)
const endTime = ref<string | null>(null)
</script>

<style scoped></style>
