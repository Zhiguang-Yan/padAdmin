import { useState, useEffect, FC } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'
import { message } from 'antd'
import { ASSETS_URL } from '@/config'

interface PropsType {
  value: string | undefined
  mode?: 'default' | 'simple'
  height?: string
  toolbarConfig?: Partial<IToolbarConfig>
  editorConfig?: Partial<IEditorConfig>
  onChange: (value: string | undefined) => void
}

const uploadFlie = (
  form: FormData
): Promise<{
  data: {
    path: string
    name: string
    id: string
  }
}> =>
  Promise.resolve({
    data: {
      path: '',
      name: '',
      id: '5555'
    }
  })

const Rich: FC<PropsType> = (props) => {
  const { toolbarConfig, editorConfig, mode, height, value, onChange } = props
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  // 销毁 editor
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy()
        setEditor(null)
      }
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode={mode}
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={(editor) => setEditor(editor)}
          onChange={(editor) => onChange(editor.getHtml())}
          mode={mode}
          style={{ height, overflowY: 'hidden' }}
        />
      </div>
    </>
  )
}

Rich.defaultProps = {
  mode: 'default',
  height: '500px',
  toolbarConfig: {},
  editorConfig: {
    placeholder: '请输入内容...',
    scroll: true,
    maxLength: 400,
    onMaxLength() {
      message.warning('字符达到上限')
    },
    MENU_CONF: {
      uploadImage: {
        async customUpload(file: File, insertFn: any) {
          const formData = new FormData()
          formData.append('file', file)
          const { data } = await uploadFlie(formData)
          const url = `${ASSETS_URL}/${data.path}?id=${data.id}`
          const alt = data.name
          const href = `${ASSETS_URL}/${data.path}?id=${data.id}`
          console.log(url, alt, href)
          insertFn(url, alt, href)
        }
      }
    }
  }
}

export default Rich
