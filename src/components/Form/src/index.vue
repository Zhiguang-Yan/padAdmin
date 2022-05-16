<template>
  <el-form
    v-if="model"
    ref="formRef"
    v-bind="$attrs"
    :model="model"
    class="pad-form"
  >
    <el-row :gutter="20">
      <el-col v-for="(option, index) in options" :key="index" v-bind="layout">
        <el-form-item
          :prop="option.prop"
          :label="option.label"
          :rules="option.rules"
        >
          <component
            :is="`el-${option.type}`"
            v-bind="option.attrs"
            v-model="model[option.prop!]"
            :placeholder="option.placeholder"
          >
            <!-- 当有子选项时候渲染 -->
            <template v-if="option.children && option.children.length">
              <!-- 为 radio checkbox -->
              <template
                v-if="['radio-group', 'checkbox-group'].includes(option.type)"
              >
                <component
                  :is="`el-${child.type}`"
                  v-for="child in option.children"
                  :key="child.value"
                  v-bind="child.attrs"
                  :label="child.value"
                >
                  {{ child.label }}
                </component>
              </template>
              <template v-else>
                <component
                  :is="`el-${child.type}`"
                  v-for="child in option.children"
                  :key="child.value"
                  v-bind="child.attrs"
                  :label="child.label"
                  :value="child.value"
                >
                </component>
              </template>
            </template>
          </component> </el-form-item
      ></el-col>
      <el-col v-if="$slots.submit" v-bind="layout">
        <el-form-item label-width="0">
          <slot name="submit"
            ><el-button type="primary">提交</el-button>
            <el-button>重置</el-button></slot
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, PropType } from 'vue'
import type { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash'
import type { FormOptions, FormOption, Ilayout } from './type'

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions>,
    required: true,
  },
  layout: {
    type: Object as PropType<Ilayout>,
    default: () => ({
      xs: 24,
      sm: 12,
      md: 8,
      lg: 6,
      xl: 6,
    }),
  },
})
const model = ref<any>(null)

const formRef = ref<FormInstance>()
watch(
  () => props.options,
  () => {
    generateForm()
  },
  {
    deep: true,
  }
)
const generateForm = () => {
  if (props.options && props.options.length) {
    const m: any = {}
    props.options.forEach((option: FormOption) => {
      m[option.prop!] = option.value
    })
    model.value = cloneDeep(m)
  }
}
onMounted(() => {
  generateForm()
})
const getModel = () => {
  return cloneDeep(model.value)
}

defineExpose({ getModel, formRef })
</script>

<style lang="scss" scoped>
.pad-form {
  div.el-form-item {
    margin-right: 0;
    width: 100%;
  }
  div.el-select {
    width: 100%;
  }
}
</style>
