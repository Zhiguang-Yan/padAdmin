import { FC } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, Input, Space, message, theme } from 'antd'
import { login } from '@/redux/modules/user/action'
import styles from './index.module.less'
import { HOME_URL } from '@/config/config'

const Login: FC = (props: any) => {
  const { search } = useLocation()
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const redirect = new URLSearchParams(search).get('redirect') || HOME_URL
  const { login } = props
  const navigate = useNavigate()
  const onFinish = (loginForm) => {
    login(loginForm.username, loginForm.password)
      .then(() => {
        navigate(redirect)
      })
      .catch((error) => {
        console.error(error)
      })
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

const mapDispatchToProps = {
  login
}

export default connect(null, mapDispatchToProps)(Login)
