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
const chartRef = ref<HTMLElement>();
const option = ref<EChartOption>({
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    left: "center",
    bottom: "10",
    data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
  },
  series: [
    {
      name: "WEEKLY WRITE ARTICLES",
      type: "pie",
      roseType: "radius",
      radius: [15, 95],
      center: ["50%", "38%"],
      data: [
        { value: 320, name: "Industries" },
        { value: 240, name: "Technology" },
        { value: 149, name: "Forex" },
        { value: 100, name: "Gold" },
        { value: 59, name: "Forecasts" },
      ],
      animationEasing: "cubicInOut",
      animationDuration: 2600,
    },
  ],
});
const { setOption } = useEchrts(chartRef, option.value as EChartOption);
watch(
  () => option.value,
  (newValue) => setOption(newValue as EChartOption)
);
</script>

<style scoped></style>
