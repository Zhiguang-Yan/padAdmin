<template>
  <div>
    <pac-menu
      mode="horizontal"
      :router="false"
      :menu-list="menuList"
    ></pac-menu>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from '@/hooks/useMenu'
const menuList = useMenu()
</script>

<style scoped></style>
