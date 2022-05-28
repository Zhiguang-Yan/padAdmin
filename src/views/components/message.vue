<template>
  <div>
    <el-button type="primary" size="default" @click="message('warning')"
      >primary</el-button
    >
    <el-button type="success" size="default" @click="message('success')"
      >success</el-button
    >
    <el-button type="danger" size="default" @click="message('error')"
      >error</el-button
    >
    <el-button type="info" size="default" @click="message('info')"
      >info</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
function message(type: any) {
  ElMessage({
    type,
    message: '🌰🍔😊😂🤣❤️😍👌😘💕😁',
  })
}
</script>

<style></style>
