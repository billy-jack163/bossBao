interface content {
  pageName: string
  header: {
    title: string
    create: string
  }
  pageLists: {
    prop: string
    label: string
    width?: string
    type?: string
    slotName?: string
  }[]
}
const listContent: content = {
  pageName: 'users',
  header: {
    title: '用户列表',
    create: '新建用户'
  },
  pageLists: [
    {
      prop: 'name',
      label: '用户名',
      width: '140'
    },
    {
      prop: 'realname',
      label: '真实姓名',
      width: '140'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      width: '140'
    },
    {
      prop: 'enable',
      label: '状态',
      width: '100',
      type: 'status'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      width: '360',
      type: 'createTime'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      width: '360',
      type: 'updateTime'
    }
  ]
}

export default listContent
