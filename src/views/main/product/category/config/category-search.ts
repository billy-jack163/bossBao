interface CategoryProps {
  pageName: string
  labelWidth: string
  propsList: Prop[]
}

interface Prop {
  type: string
  props: string
  label: string
  placeholder?: string
}
const category: CategoryProps = {
  pageName: 'system:users',
  labelWidth: '100',
  propsList: [
    {
      type: 'input',
      props: 'name',
      label: '用户名',
      placeholder: '请输入查询的用户名'
    },
    {
      type: 'input',
      props: 'realname',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      type: 'input',
      props: 'cellphone',
      label: '手机号码',
      placeholder: '请输入手机号码'
    },
    {
      type: 'select',
      props: 'enable',
      label: '状态',
      placeholder: '请选择当前状态'
    },
    {
      type: 'datepicker',
      props: 'createAt',
      label: '创建时间'
    }
  ]
}
export default category
