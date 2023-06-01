import { FC, Key } from 'react'
import { Col, Tabs, Table } from 'antd'
import type { TabsProps } from 'antd'
import { useState } from 'react'
const { Column, ColumnGroup } = Table

interface DataType {
  key: Key
  date: string
  name: string
  province: string
  city: string
  address: string
  zip: number
}

const Section3: FC = () => {
  const [loading, setLoading] = useState(false)
  const data: DataType[] = [
    {
      key: '1',
      date: '2023-5-31',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      key: '2',
      date: '2023-5-31',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      key: '3',
      date: '2023-5-31',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      key: '4',
      date: '2023-5-31',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      key: '5',
      date: '2023-5-31',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },
    {
      key: '6',
      date: '2023-5-31',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }
  ]

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `配送管理`,
      children: (
        <Table bordered loading={loading} sticky dataSource={data}>
          <Column title="日期" align="center" dataIndex="date" ellipsis></Column>
          <ColumnGroup title="配送信息" align="left">
            <Column title="姓名" dataIndex="name" ellipsis></Column>
            <Column title="省份" dataIndex="province" ellipsis></Column>
            <Column title="市区" dataIndex="city" ellipsis></Column>
            <Column title="地址" dataIndex="address" ellipsis></Column>
            <Column title="邮编" dataIndex="zip" ellipsis></Column>
          </ColumnGroup>
        </Table>
      )
    },
    {
      key: '2',
      label: `区域管理`,
      children: (
        <Table bordered loading={loading} sticky dataSource={data}>
          <Column title="日期" align="center" ellipsis dataIndex="date"></Column>
          <ColumnGroup title="区域信息" align="left">
            <Column title="姓名" dataIndex="name" ellipsis></Column>
            <Column title="省份" dataIndex="province" ellipsis></Column>
            <Column title="市区" dataIndex="city" ellipsis></Column>
            <Column title="地址" dataIndex="address" ellipsis></Column>
            <Column title="邮编" dataIndex="zip" ellipsis></Column>
          </ColumnGroup>
        </Table>
      )
    }
  ]
  return (
    <Col span={24}>
      <div className="card">
        <div className="content">
          <Tabs defaultActiveKey="1" items={items}></Tabs>
        </div>
      </div>
    </Col>
  )
}

export default Section3
