interface ModalList {
  pageName: string
  labelWidth: string
  title?: string
  ModalLists: {
    type: string
    prop: string
    label: string
    placeholder?: string
    slotName?: string
  }[]
}
const pageModalContent: ModalList = {
  pageName: 'users',
  labelWidth: '120',
  title: '新建用户',
  ModalLists: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'input',
      prop: 'realname',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '手机号码',
      placeholder: '请输入手机号码'
    },
    {
      type: 'password',
      prop: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'custom',
      prop: 'roleId',
      label: '选择角色',
      placeholder: '请选择角色',
      slotName: 'role'
    },
    {
      type: 'custom',
      prop: 'departmentId',
      label: '部门',
      placeholder: '请选择部门',
      slotName: 'department'
    }
  ]
}
export default pageModalContent
