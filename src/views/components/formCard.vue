<template>
  <el-form :model="options" ref="formRef" class="pad_form_ref">
    <el-card v-for="(form, index) in options.forms">
      <el-form-item label="姓名" :prop="`forms[${index}].name`"
        :rules="[{ required: true, message: '请输入名字', trigger: 'blur' }]">
        <el-input v-model="form.name" placeholder="请输入名字"></el-input>
      </el-form-item>
      <el-form-item label="性别" :prop="`forms[${index}].sex`"
        :rules="[{ required: true, message: '请选择性别', trigger: 'blur' }]">
        <el-input v-model="form.sex" placeholder="请选择"></el-input>
      </el-form-item>
      <el-form-item label="年龄" :prop="`forms[${index}].age`"
        :rules="[{ required: true, message: '请输入年龄', trigger: 'blur' }]">
        <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
    </el-card>
  </el-form>
  <el-button type="primary" :disabled="options.forms.length <= 1" @click="handleDelete">删除</el-button>
  <el-button type="primary" @click="handleAdd">新增</el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { validELForm } from '@/utils/validate'
const props = defineProps({
  options: {
    type: Object,
    required: true,
  }
})

const emits = defineEmits(['updateForm'])

const formRef = ref<FormInstance>()
const handleAdd = () => {
  const tempForm = props.options
  const newForm = { name: null, sex: null, age: null }
  tempForm.forms.push(newForm)
  emits('updateForm', tempForm)
}

const validate = () => {
  return new Promise((resolve, reject) => {
    validELForm(formRef.value).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const handleDelete = () => {
  let tempForm = props.options
  tempForm.forms.splice(-1)
  emits('updateForm', tempForm)
}

defineExpose({
  validate
})

</script>
<style lang="scss" scoped>
.pad_form_ref {
  .el-card {
    margin-bottom: 20px;
  }
}
</style>