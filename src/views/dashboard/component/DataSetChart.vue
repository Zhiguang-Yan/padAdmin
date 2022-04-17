<template>
    <div ref="chartRef" :class="className" :style="{ height: height, width: width }" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { EChartOption } from 'echarts'
import { useEchrts } from '@/hooks/useEchrts'
const props = defineProps({
    className: {
        type: String,
        default: "chart",
    },
    width: {
        type: String,
        default: "100%",
    },
    height: {
        type: String,
        default: "300px",
    },
});

const chartRef = ref<HTMLElement>()
const option = ref<EChartOption>({
    tooltip: {

    },
    legend: {

    },
    xAxis: {
        type: 'category'
    },
    yAxis: {},
    series: [
        {
            type: 'line',
            barWidth: 24
        },
        {
            type: 'line',
            barWidth: 24
        }
    ],
    dataset: {
        source: [
            ['product', '左眼', '右眼'],
            ['一年级', 26, 59],
            ['二年级', 83, 55],
            ['三年级', 86, 65],
            ['四年级', 72, 53]
        ]
    }
});
const { setOption } = useEchrts(chartRef, option.value as EChartOption)
</script>

<style scoped>
</style>