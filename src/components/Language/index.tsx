import { Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { ReactComponent as Internationalization } from '@/icons/svg/internationalization.svg'

const Language = () => {
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'CN 简体中文'
    },
    {
      key: 2,
      label: 'HK 繁體中文'
    },
    {
      key: 3,
      label: 'US English'
    }
  ]
  return (
    <Dropdown menu={{ items }}>
      <Button
        style={{
          height: '100%',
          minWidth: '48px',
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        type="text"
        icon={
          <Internationalization
            style={{
              fontSize: '24px'
            }}
          />
        }
      ></Button>
    </Dropdown>
  )
}

export default Language
