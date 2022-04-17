<template>
  <div ref="chartRef" :class="className" :style="{ height: height, width: width }" />
</template>
<script setup lang="ts">
import type { EChartOption } from "echarts";
import { ref, watch } from "vue";
import { useEchrts } from "@/hooks/useEchrts";
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
const data_1 = ref<number[]>([79, 52, 200, 334, 390, 330, 220]);
const data_2 = ref<number[]>([79, 52, 200, 334, 390, 330, 220]);
const data_3 = ref<number[]>([79, 52, 200, 334, 390, 330, 220]);
const animationDuration = 300;
const option = ref<EChartOption>({
  tooltip: {
    trigger: "item",
  },
  grid: {
    top: 10,
    left: "2%",
    right: "2%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "pageA",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      data: data_1.value,
      animationDuration,
    },
    {
      name: "pageB",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      data: data_2.value,
      animationDuration,
    },
    {
      name: "pageC",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      data: data_3.value,
      animationDuration,
    },
  ],
});
const chartRef = ref<HTMLElement>();
const { setOption } = useEchrts(chartRef, option.value as EChartOption);
watch(
  () => option.value,
  (newValue) => {
    setOption(newValue as EChartOption);
  },
  {
    deep: true,
  }
);
</script>

<style scoped>
</style>
