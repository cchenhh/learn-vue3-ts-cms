import { IForm } from '@/base-ui/form'
export const modelConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  labelWidth: '120px',
  itemStyle: { padding: '5px 10px' },
  collayout: { span: 24 }
}
