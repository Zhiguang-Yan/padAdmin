import { FC, useState } from 'react'
import Rich from '@/components/Rich'
import { Card } from 'antd'

const WangEditor: FC = () => {
  const [value, setValue] = useState<string | undefined>()
  return (
    <div>
      <Card>
        <Rich value={value} mode="simple" onChange={(val) => setValue(val)} />
      </Card>
    </div>
  )
}

export default WangEditor
