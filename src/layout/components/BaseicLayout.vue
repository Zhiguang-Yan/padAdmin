<template>
  <el-container>
    <el-aside width="auto" class="pad-aside">
      <el-scrollbar>
        <logo></logo>
        <pac-menu
          :menu-list="menuList"
          :default-active="$route.path"
          :collapse="collapse"
          class="pad-menu-vertical"
          background-color="#001529"
          text-color="rgba(255, 255, 255, 0.65)"
          active-text-color="#fff"
        ></pac-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="pad-header">
        <NavHeader />
      </el-header>
      <el-main>
        <el-card class="pad-card">
          <router-view />
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { Logo } from './index'
import { NavHeader } from './index'
import { useRoute } from 'vue-router'

const route = useRoute()
const permission = usePermissionStore()
const collapse = computed(() => useAppStore().isCollapsed)
const menuList = computed(() => permission.menu_list)
</script>

<style scoped lang="scss">
.pad-header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
}
.pad-card {
  min-height: 100%;
}
</style>