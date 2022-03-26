import {} from '../../components/list/src/type'

export const list = [
  {
    title: '通知',
    content: [
      {
        title: '蒂姆·库克回复了你的邮件',
        time: '2019-05-08 14:33:18',
        isRead: false,
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      },
      {
        title: '乔纳森·伊夫邀请你参加会议',
        time: '2019-05-08 14:33:18',
        isRead: true,
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      },
      {
        title: '斯蒂夫·沃兹尼亚克已批准了你的休假申请',
        time: '2019-05-08 14:33:18',
        isRead: false,
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      },
    ],
  },
  {
    title: '消息',
    content: [
      {
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        desc: '描述信息描述信息描述信息',
        time: '3小时前',
        isRead: false,
      },
      {
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        desc: '描述信息描述信息描述信息',
        time: '3小时前',
        isRead: false,
      },
      {
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        desc: '描述信息描述信息描述信息',
        time: '3小时前',
        isRead: false,
      },
    ],
  },
  {
    title: '待办',
    content: [
      {
        desc: '任务需要在 2017-01-12 20:00 前启动',
        tag: '未开始',
        tagType: 'success',
        title: '任务名称',
        isRead: false,
      },
      {
        desc: '雪梅提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        tag: '马上到期',
        tagType: 'danger',
        title: '第三方紧急代码变更',
        isRead: false,
      },
      {
        desc: '指派竹尔于 2017-01-09 前完成更新并发布',
        tag: '已耗时8天',
        tagType: 'warning',
        title: '信息安全考试',
        isRead: false,
      },
    ],
  },
]

export const actions = [
  {
    text: '清空',
    // icon: 'delete',
  },
  {
    text: '查看更多',
    // icon: 'edit',
  },
]
