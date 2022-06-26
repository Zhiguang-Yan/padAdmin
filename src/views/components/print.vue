<template>
    <div>
        <el-button type="primary" @click="handlePrint">打印</el-button>
        <Test id="print" />
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import printJS from 'print-js'
import Test from './test.vue'
const date = ref()
const handlePrint = () => {
    printJS({
        printable: 'print',
        documentTitle: "流水单",
        type: 'html',
        targetStyles: ['*'],
        style: "@page {margin:0 10mm}"
    })
}

</script>

<style lang="scss">
</style>
