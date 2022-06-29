<template>
    <div class="print_container">
        <div id="print">
            <slot></slot>
        </div>

    </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import printJS from 'print-js'


const props = defineProps({
    printOptions: {
        type: Object,
        default: () => ({
            printable: 'print',
            documentTitle: "流水单",
            type: 'html',
            targetStyles: ['*'],
            style: "@page {margin:0 10mm}"
        })
    }
})

const handlePrint = () => {
    nextTick(() => printJS(props.printOptions as any))

}
defineExpose({ print: handlePrint })
</script>

<style  lang="scss" scoped>
.print_container {
    height: 0;
    overflow: hidden;
    width: 100%;
}
</style>