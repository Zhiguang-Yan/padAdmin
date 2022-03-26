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
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
}
.logout {
  transform: rotate(90deg);
  margin-left: 5px;
}
</style>