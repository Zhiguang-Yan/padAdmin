<template>
  <div class="flex-c">
    <div style="width: 400px">
      <pac-form ref="formRef" :options="options" :layout="layout">
        <template #submit>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleReset">重置</el-button>
        </template>
      </pac-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import type { FormOptions, Ilayout } from '@/components/Form/src/type'
import { validELForm } from '@/utils/validate'
const layout: Ilayout = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
}
const formRef = ref<Ref | null>(null)
const options: FormOptions = [
  {
    type: 'input',
    prop: 'name',
    label: 'Activity name',
    value: null,
    placeholder: '',
    rules: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
  },
  {
    type: 'select',
    prop: 'region',
    label: 'Activity zone',
    value: null,
    placeholder: 'Activity zone',
    rules: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change',
      },
    ],
    children: [
      {
        type: 'option',
        value: 'shanghai',
        label: 'Zone one',
      },
      {
        type: 'option',
        value: 'beijing',
        label: 'Zone two',
      },
    ],
    attrs: {
      filterable: true,
    },
  },
  {
    type: 'date-picker',
    prop: 'datetime',
    value: null,
    label: 'Activity time',

    placeholder: 'Please pick a datetime',
    attrs: {
      type: 'datetime',
      valueFormat: 'X',
      style: {
        width: '100%',
      },
    },
    rules: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a datetime',
        trigger: 'change',
      },
    ],
  },
  {
    type: 'switch',
    label: 'Instant delivery',
    value: false,
    prop: 'delivery',
  },
]

const handleSubmit = async () => {
  try {
    const res = await validELForm(formRef.value!.formRef)
    if (res) {
      const model = formRef.value.getModel()
      console.log(model)
    }
  } catch (error) {
    console.error(error)
  }
}

function handleReset() {
  formRef.value?.formRef.resetFields()
}
</script>

<style>
</style>
