<template>
  <div>
    <el-button type="primary" size="default" @click="message('warning')">primary</el-button>
    <el-button type="success" size="default" @click="message('success')">success</el-button>
    <el-button type="danger" size="default" @click="message('error')">error</el-button>
    <el-button type="info" size="default" @click="message('info')">info</el-button>
    <template v-if="options.length">
      <formCard v-for="(option, index) in options" :ref="setItemRef" :options="option"
        @update-form="(form) => options[index] = form">
      </formCard>
    </template>
    <div style="margin-top: 50px">
      <el-button type="success" @click="onSubmit">提交</el-button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import formCard from './formCard.vue';
function message(type: any) {
  ElMessage({
    type,
    message: '🌰🍔😊😂🤣❤️😍👌😘💕😁',
  })
}
const listRef = ref<any>([])
const setItemRef = (el: any) => {
  listRef.value.push(el)
}
const onSubmit = () => {
  const list: any = []
  listRef.value.forEach((element: any) => {
    list.push(element.validate())
  })
  Promise.all(list).then(res => {
    console.log(res);
  }).catch(err => {
    console.error(err);

  })
}

const options = ref<any>([
  {
    forms: [{
      name: null,
      sex: null,
      age: null
    }, {
      name: null,
      sex: null,
      age: null
    }]
  },
  {
    forms: [{
      name: null,
      sex: null,
      age: null
    }, {
      name: null,
      sex: null,
      age: null
    }]
  }
])
const handleAdd = () => {


}
</script>

<style scoped lang="scss">
</style>
