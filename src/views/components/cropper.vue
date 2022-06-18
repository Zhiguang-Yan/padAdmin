<template>
  <div>
    <el-space>
      <el-button type="primary" @click="dialogVisible = true"
        >图片裁剪组件</el-button
      >
      <el-image :src="src" style="height: 200px; width: 200px"></el-image>
    </el-space>

    <pac-cropper
      v-model:img-file="url"
      :upload-api="uploadApi"
      v-model:visible="dialogVisible"
      @cropper="handleCropper"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { urlToBase64 } from '@/utils/img'
const dialogVisible = ref(false)
const url = ref()

const src = ref()
const handleCropper = (url: string) => {
  src.value = url
}

const uploadApi = () => {
  return new Promise((resolve) => {
    resolve({
      data: {
        path: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    })
  })
}

onMounted(async () => {
  try {
    const base64 = await urlToBase64(
      'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    )
    url.value = base64
  } catch (error) {
    console.log(error)
  }
})
</script>

<style></style>
