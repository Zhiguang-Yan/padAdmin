<template>
    <div>
        <el-button type="primary" @click="handleClick">打印</el-button>
        <pac-print ref="printRef">
            <Test :value="value" />
        </pac-print>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Test from './test.vue'
const printRef = ref()
const value = ref()
const handleClick = () => {
    value.value = 'print_test'
    printRef.value.print()
}
</script>

<style lang="scss" scoped>
.container {
    height: 0px;
    width: 100%;
    overflow: hidden;

}
</style>
