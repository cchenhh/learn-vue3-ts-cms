// 编写好规则
export const rules = {
  // require表示是否时必传的
  // message表示不符合规则时会显示什么样的内容
  // trigger表示什么时候会触发这个规则：blur失去焦点的时候 ，change有修改时触发
  name: [
    { required: true, message: '用户名是必传内容', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码是必传内容', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}
