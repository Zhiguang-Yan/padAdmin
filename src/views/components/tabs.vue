<template>
  <div>
    {{ value }}
    <pac-tabs v-model:value="value" @tab-change="change">
      <pac-tab-pane name="first" label="User">1</pac-tab-pane>
      <pac-tab-pane name="second" label="Config">2</pac-tab-pane>
      <pac-tab-pane name="third" label="Role">3</pac-tab-pane>
      <pac-tab-pane name="fourth" label="Task">4</pac-tab-pane>
    </pac-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('second')
const change = (name: string) => {
  console.log(name)
}
</script>
