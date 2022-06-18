<template>
  <div class="rich_text_wrapper">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="html"
      class="rich_editor"
      :style="{ height }"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, computed, shallowRef } from 'vue'
import { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

const props = withDefaults(
  defineProps<{
    value: string
    mode: string
    height: string
    toolbarConfig: Partial<IToolbarConfig>
    editorConfig: Partial<IEditorConfig>
  }>(),
  {
    mode: 'simple',
    editorConfig: () => ({
      MENU_CONF: {},
    }),
    height: '400px',
    toolbarConfig: () => ({}),
  }
)

const emits = defineEmits(['update:value'])
const editorRef = shallowRef()

const html = computed({
  get: () => props.value,
  set: (value) => {
    emits('update:value', value)
  },
})
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style lang="scss">
.rich_text_wrapper {
  width: 600px;
  border: 1px solid #ccc;
  margin: 5px;
  div.rich_editor {
    overflow-y: hidden;
  }
}
.w-e-full-screen-container {
  z-index: 999;
}
</style>
