<template>
  <HorizontalLayout v-if="mode === 'horizontal'" />
  <BasicLayout v-else />
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'
import { HorizontalLayout, BasicLayout } from './components'
const appStore = useAppStore()
const mode = computed(() => appStore.mode)
</script>
