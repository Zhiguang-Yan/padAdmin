<template>
  <div>
    <el-space :size="10">
      <el-select
        v-model="state.province"
        placeholder="请选择省份"
        clearable
        filterable
        @change="
          () => {
            state.city = ''
            state.area = ''
          }
        "
      >
        <el-option
          v-for="item in state.provinceOptions"
          :key="item.code"
          :value="item.code"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-select
        v-model="state.city"
        :disabled="!state.province"
        placeholder="请选择城市"
        clearable
        filterable
        @change="() => (state.area = '')"
      >
        <el-option
          v-for="item in state.cityOptions"
          :key="item.code"
          :value="item.code"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-select
        :disabled="!state.province || !state.city"
        v-model="state.area"
        placeholder="请选择区域"
        clearable
        filterable
        @change="handleChange"
      >
        <el-option
          v-for="item in state.areaOptions"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        >
        </el-option>
      </el-select>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue'
// @ts-ignore
import dataJson from '../lib/data.json'
interface IArea {
  name: string
  code: string
  children?: IArea[]
}
interface Data {
  name: string
  code: string
}
export type Iselect = {
  province: Data
  city: Data
  area: Data
} | null
type Istate = {
  provinceOptions: IArea[]
  cityOptions: IArea[]
  areaOptions: IArea[]
  city: string
  area: string
  province: string
}
const props = defineProps<{
  select: Iselect
}>()
const emits = defineEmits(['update:select'])
const state = reactive<Istate>({
  provinceOptions: dataJson,
  cityOptions: [],
  areaOptions: [],
  province: props.select?.province.code || '',
  city: props.select?.city.code || '',
  area: props.select?.area.code || '',
})
watch(
  () => state.province,
  (newValue) => {
    if (newValue) {
      state.cityOptions =
        state.provinceOptions.find((v) => v.code === newValue)!.children || []
    }
  },
  {
    deep: true,
    immediate: true,
  }
)
watch(
  () => state.city,
  (newValue) => {
    if (newValue) {
      state.areaOptions =
        state.cityOptions.find((v) => v.code === newValue)!.children || []
    }
  },
  {
    deep: true,
    immediate: true,
  }
)

function handleChange() {
  if (state.area) {
    const province = {
      code: state.province,
      name: state.provinceOptions.find((v) => v.code === state.province)!.name,
    }
    const city = {
      code: state.city,
      name: state.cityOptions.find((v) => v.code === state.city)!.name,
    }
    const area = {
      code: state.area,
      name: state.areaOptions.find((v) => v.code === state.area)!.name,
    }
    emits('update:select', {
      province,
      city,
      area,
    })
  }
}
</script>

<style scoped>
</style>