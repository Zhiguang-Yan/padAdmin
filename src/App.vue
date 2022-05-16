<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  document.getElementById('main-loading')!.style.display = 'none'
})
</script>

<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>
