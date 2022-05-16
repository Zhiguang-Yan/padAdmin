<template>
  <el-affix>
    <div class="container-logo" @click="$router.push('/')">
      <img src="@/assets/logo.png" alt="" />
    </div>
  </el-affix>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container-logo {
  background: #001529;
  height: 60px;
  color: #fff;
  padding: 0 8px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
  img {
    height: 40px;
    vertical-align: middle;
  }
}
</style>
