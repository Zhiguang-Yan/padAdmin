<template>
  <el-container>
    <el-header>
      <pac-menu mode="horizontal" :default-active="$route.path" :menu-list="menuList"></pac-menu>
    </el-header>
    <el-main class="pad_main">
      <el-card class="pad_card">
        <router-view />
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useMenu } from '@/hooks/useMenu'
const menuList = useMenu()
</script>

<style scoped>
</style>
