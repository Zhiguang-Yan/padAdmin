<template>
  <div>
    <pac-choose-area v-model:select="select"></pac-choose-area>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Iselect } from '@/components/chooseArea/src/index.vue'
const select = ref<Iselect>({
  province: { code: '21', name: '辽宁省' },
  city: { code: '2105', name: '本溪市' },
  area: { code: '210521', name: '本溪满族自治县' },
})
</script>

<style scoped lang="scss">
</style>
