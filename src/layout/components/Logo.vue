<template>
  <el-affix>
    <div class="container-logo" @click="$router.push('/')">
      <img src="@/assets/logo.png" alt="" />
      <span v-show="collapse">PadAdmin</span>
    </div>
  </el-affix>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
const collapse = computed(() => !appStore.isCollapsed)
</script>

<style scoped lang="scss">
.container-logo {
  background: #001529;
  height: 60px;
  color: #fff;
  padding: 0 8px;
  line-height: 60px;
  cursor: pointer;
  img {
    height: 40px;
    vertical-align: middle;
  }
  span {
    font-size: 20px;
    padding-left: 8px;
  }
}
</style>