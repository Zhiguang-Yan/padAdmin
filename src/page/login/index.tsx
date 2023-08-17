import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, Input, Space, message, theme } from 'antd'
import { login } from '@/store/festures/userSlice'
import styles from './index.module.less'
import { HOME_URL } from '@/config/config'
import { useStoreDispatch } from '@/store'

const Login: FC = () => {
  const { search } = useLocation()
  const dispatch = useStoreDispatch()
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const redirect = new URLSearchParams(search).get('redirect') || HOME_URL
  const navigate = useNavigate()
  const onFinish = async (loginForm) => {
    try {
      await dispatch(
        login({
          username: loginForm.username,
          password: loginForm.password
        })
      )
      navigate(redirect)
    } catch (error) {
      console.error(error)
    }
  }

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0])
  }
  const [loginFormRef] = Form.useForm()
  const fromOptions = {
    labelCol: { span: 4 },
    initialValues: {
      username: 'admin',
      password: 123456,
      avatar: null
    },
    wrapperCol: { span: 20 },
    onFinish,
    onFinishFailed
  }

  return (
    <div
      className={styles.logonContainer}
      style={{
        backgroundColor: colorBgContainer
      }}
    >
      <Form
        form={loginFormRef}
        name="login"
        {...fromOptions}
        size="large"
        className={styles.padForm}
      >
        <Form.Item label="用户名" hasFeedback name="username" rules={[{ required: true }]}>
          <Input allowClear placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" hasFeedback name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="reset">重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Login
