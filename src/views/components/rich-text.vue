<template>
  <div>
    <pac-rich v-model:value="html"></pac-rich>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const html = ref()
</script>

<style></style>
