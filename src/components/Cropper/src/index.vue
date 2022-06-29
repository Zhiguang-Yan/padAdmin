<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import type { UploadInstance, UploadRequestOptions } from 'element-plus'
import { ElMessage } from 'element-plus'
import {
  ZoomIn,
  ZoomOut,
  RefreshLeft,
  RefreshRight,
  Refresh,
} from '@element-plus/icons'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { toBase64, toFile } from '@/utils/img'

const props = withDefaults(
  defineProps<{
    visible: boolean
    imgFile?: string
    autoCropWidth?: number
    autoCropHeight?: number
    accept?: string
    uploadApi: (query: Record<string, any>) => Promise<any> // 上传api
  }>(),
  {
    imgFile: '',
    autoCropWidth: 750,
    autoCropHeight: 375,
    accept: 'image/*',
  }
)

const disabled = computed(() => !props.imgFile)

const OPTIONS = {
  viewMode: 1,
  preview: '.before',
  guides: true,
  background: false,
  aspectRatio: props.autoCropWidth / props.autoCropHeight,
  autoCropArea: 1,
  zoomOnWheel: true,
  rotatable: true,
  zoomable: true,
}

const emits = defineEmits(['update:imgFile', 'update:visible', 'cropper'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => {
    emits('update:visible', value)
  },
})
const uploadRef = ref<UploadInstance>()
const handleUpload = async (params: UploadRequestOptions) => {
  try {
    const base64 = await toBase64(params.file)
    emits('update:imgFile', base64)
  } catch (error) {
    console.error(error)
  }
}
const myCropper = ref()
const image = ref()
// 初始化
const initCropper = () => {
  if (!image.value) {
    return
  }
  myCropper.value = new Cropper(image.value, OPTIONS as any)
  myCropper.value.replace(props.imgFile, false)
}
const sureSava = async () => {
  if (!myCropper.value.url) {
    ElMessage.warning('请选择图片')
    return
  }
  const urlbase64 = myCropper.value
    .getCroppedCanvas()
    .toDataURL('image/jpeg', 0.7)
  try {
    const formData = new FormData()
    formData.append('file', toFile(urlbase64))
    const { data } = await props.uploadApi(formData)
    // const path = `${import.meta.env.VITE_APP_ASSETS_URL}/${data.path}`
    const path = data.path
    emits('cropper', path)
    dialogVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
// 缩放
const cropperzoom = (val: number) => {
  myCropper.value.zoom(val)
}
// 重置
const cropperReset = () => {
  myCropper.value.reset()
}
// 旋转
const cropperRotate = (val: number) => {
  myCropper.value.rotate(val)
}
watch(
  () => props.imgFile,
  (newValue) => {
    newValue && myCropper.value && myCropper.value.replace(newValue, false)
  }
)

const handleClose = () => {
  emits('update:imgFile', undefined)
  myCropper.value.destroy()
}
const handleOpen = () => {
  initCropper()
}
</script>
<template>
  <el-dialog v-model="dialogVisible" v-bind="$attrs" title="裁剪图片" width="55%" @close="handleClose" @opened="handleOpen">
    <div class="cropper-content">
      <!-- 剪裁框 -->
      <div class="cropper">
        <img ref="image" alt="" />
      </div>
      <!-- 预览框 -->
      <div class="show-preview" :style="{
        overflow: 'hidden',
        margin: '0 25px',
        display: 'flex',
        'align-items': 'center',
      }">
        <div class="preview before" />
      </div>
    </div>
    <div class="footer-btn">
      <!-- 缩放旋转按钮 -->
      <div class="scope-btn">
        <el-upload ref="uploadRef" :show-file-list="false" :accept="accept" :http-request="handleUpload" class="upload">
          <template #trigger>
            <el-button type="primary" size="defalut">选择图片</el-button>
          </template>
        </el-upload>
        <el-tooltip class="item" effect="dark" content="放大" placement="top">
          <el-button :disabled="disabled" size="defalut" @click="cropperzoom(0.05)">
            <el-icon>
              <ZoomIn />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="缩小" placement="top">
          <el-button :disabled="disabled" size="defalut" @click="cropperzoom(-0.05)">
            <el-icon>
              <ZoomOut />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="逆时针旋转" placement="top">
          <el-button :disabled="disabled" size="defalut" @click="cropperRotate(-90)">
            <el-icon>
              <RefreshLeft />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="顺时针旋转" placement="top">
          <el-button :disabled="disabled" size="defalut" @click="cropperRotate(90)">
            <el-icon>
              <RefreshRight />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="重置" placement="top">
          <el-button :disabled="disabled" size="defalut" @click="cropperReset">
            <el-icon>
              <Refresh />
            </el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <!-- 确认上传按钮 -->
      <div class="upload-btn">
        <!-- <el-button type="primary" @click="uploadImg('blob')">上传</el-button> -->
        <el-button size="defalut" @click="dialogVisible = false">取消</el-button>
        <el-button size="defalut" type="primary" @click="sureSava">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.cropper {
  border: 1px solid #fff;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC);

  img {
    width: 100%;
    opacity: 0;
  }
}

.cropper-content {
  display: flex;
  justify-content: flex-end;

  .cropper {
    flex: 1;
    height: 400px;
    overflow: hidden;
  }

  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    justify-content: center;
    overflow: hidden;
    /* border: 1px solid #cccccc; */
    background: #cccccc;
    margin-left: 40px;

    .preview {
      overflow: hidden;
      border: 1px solid #468ac8;
      background: #cccccc;
    }
  }
}

.footer-btn {
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
}

.footer-btn .scope-btn {
  width: 260px;
  display: flex;
}

.scope-btn {
  .upload {
    margin-right: 15px;
  }
}

.footer-btn .scope-btn span {
  display: inline-block;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
}

.footer-btn .scope-btn span i {
  color: #333333;
}

.footer-btn .upload-btn {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 25px;
}

.footer-btn .btn {
  outline: none;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.solide {
  margin-left: 25px;
  width: 200px;
}

.before {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
