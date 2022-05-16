<template>
  <div>
    <span class="el-dropdown-link" @click="logout">
      退出
      <el-icon-upload class="logout" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const appStore = useUserStore()
function logout() {
  appStore.logout().then(() => {
    router.push(`/login?redirect=${route.fullPath}`)
  })
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  color: var(--el-color-primary);
  cursor: pointer;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.logout {
  transform: rotate(90deg);
  margin-left: 5px;
  display: inline-block;
  height: 1.2em;
  width: 1.2em;
}
</style>
