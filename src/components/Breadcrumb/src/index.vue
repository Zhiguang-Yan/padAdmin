<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item
        v-for="(breadcrumb, index) in levelList"
        :key="breadcrumb.path"
      >
        <span
          v-if="breadcrumb.redirect === 'noRedirect' || index == levelList!.length - 1"
          class="b_text"
        >
          {{ breadcrumb.meta.title }}
        </span>
        <a v-else class="b_link" @click.prevent="handleClick(breadcrumb)">
          {{ breadcrumb.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars */
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationMatched } from 'vue-router'

const route = useRoute()
const router = useRouter()
const levelList = ref<RouteLocationMatched[]>()

const generateBreadcrumb = () => {
  const matched = route.matched.filter((v) => v.meta && v.meta.title)
  levelList.value = matched.filter(
    (v) => v.meta && v.meta.title && v.meta.breadcrumb !== false
  )
}

watch(
  () => route,
  () => {
    generateBreadcrumb()
  },
  {
    deep: true,
    immediate: true,
  }
)
function handleClick(breadcrumb: RouteLocationMatched) {
  const { name } = breadcrumb
  router.push({ name })
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 42px;
  height: 42px;
  margin-left: 8px;
  font-weight: 400;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .b_link {
    color: #222;
    font-weight: 400;
  }
  .b_text {
    color: #b3b3b3;
  }
}
</style>
