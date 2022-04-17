<template>
  <div class="choose_time_container">
    <el-space>
      <el-time-select v-bind="$attrs.startOptions" v-model="startTime" :placeholder="startPlaceholder" :max-time="end"
        :start="startTimeStart" :step="startSetup" :end="startTimeEnd" />
      <el-time-select v-bind="$attrs.endOptions" v-model="endTime" :disabled="!startTime" :min-time="start"
        :placeholder="startPlaceholder" :start="endTimeStart" :step="endSetup" :end="endTimeEnd" />
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const props = defineProps({
  start: {
    type: String,
    default: ""
  },
  end: {
    type: String,
    default: ""
  },
  // 开始时间的占位符
  startPlaceholder: {
    type: String,
    default: "请选择开始时间",
  },
  // 开始时间的初始化
  startTimeStart: {
    type: String,
    default: "08:00",
  },
  // 开始时间的进步时间
  startSetup: {
    type: String,
    default: "00:30"
  },
  //开始时间结束时间的初始化
  startTimeEnd: {
    type: String,
    default: "24:00"
  },
  // 结束时间的初始化
  endTimeStart: {
    type: String,
    default: "08:00",
  },
  // 结束时间的进步时间
  endSetup: {
    type: String,
    default: "00:30"
  },
  //结束时间结束时间的初始化
  endTimeEnd: {
    type: String,
    default: "24:00"
  }
});

const emits = defineEmits(['update:start', 'update:end',])
// 开始时间
const startTime = computed({
  get: () => props.start,
  set: (val) => {
    emits('update:start', val)
    emits('update:end', null)
  }
})
// 结束时间
const endTime = computed({
  get: () => props.end,
  set: (val) => {
    emits('update:end', val)
  }
})
</script>

<style scoped lang="scss">
.choose_time_container {
  display: flex;
}
</style>
