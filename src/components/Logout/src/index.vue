<template>
  <div>
    <span class="el-dropdown-link" @click="logout">
      退出
      <el-icon-upload class="logout" />
    </span>
  </div>
</template>

<script setup lang="ts">
function logout() {}
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