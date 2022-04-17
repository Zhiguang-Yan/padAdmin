<template>
  <div ref="demoRef">
    <el-radio-group v-model="radio">
      <el-radio-button label="newVisitis"></el-radio-button>
      <el-radio-button label="messages"></el-radio-button>
      <el-radio-button label="purchases"></el-radio-button>
      <el-radio-button label="shoppings"></el-radio-button>
    </el-radio-group>
    <el-row>
      <el-col :span="24">
        <LineChart :chart-data="chartData" />
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <RaddarChart />
      </el-col>
      <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <PieChart />
      </el-col>
      <el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
        <BarChart />
      </el-col>
    </el-row>
    <el-row>
      <DataSetChart />
    </el-row>
  </div>
  <div ref="text"></div>
  <el-row>
    <el-button @click="htmlToPdf">打印</el-button>
  </el-row>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { LineChart, BarChart, RaddarChart, PieChart, DataSetChart } from "./component";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};
const chartData = ref<any>();
const radio = ref<string>("newVisitis");
watch(
  () => radio.value,
  (value) => {
    value && (chartData.value = lineChartData[value as keyof typeof lineChartData]);
  },
  {
    immediate: true,
  }
);
const demoRef = ref<HTMLElement | null>(null);
const text = ref<HTMLElement | null>(null);
async function htmlCanvas() {
  const canvas = await html2canvas(demoRef.value as HTMLElement, {
    useCORS: true,
    allowTaint: true,
    imageTimeout: 0,
  }).then((res) => {
    return res;
  });
  return canvas;
}
function canvasToPdf(htmlCanvas: any) {
  const canvasWidth = htmlCanvas.width;
  const canvasHeight = htmlCanvas.height;
  const imgBase64 = htmlCanvas.toDataURL("image/jpeg", 1.0);
  const imgWidth = 595.28 - 40;
  const imgHeight = (595.28 / canvasWidth) * canvasHeight;
  let pageHeight = imgHeight; // pdf转化后页面总高度
  const doc = new jsPDF("p", "pt", "a4");
  doc.addImage(imgBase64, "JPEG", 20, 20, imgWidth, imgHeight);
  doc.save("报表.pdf");
}

async function htmlToPdf() {
  const canvas = await htmlCanvas();
  canvasToPdf(canvas);
}
</script>

<style scoped>
</style>
