<template>
    <div class="test_content">{{ value }}</div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
    value: string,
}>(), {
    value: '111111111111',
})
</script>
<style lang="scss" scoped>
.test_content {
    height: 300px;
    width: 100%;
    background-color: red
}
</style>