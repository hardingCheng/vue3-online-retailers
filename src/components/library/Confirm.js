// 实现函数式调用组件方式和完成交互。
import { createVNode, render } from 'vue'
import Confirm from './confirm.vue'

// 准备div
const div = document.createElement('div')
div.setAttribute('class', 'confirm-container')
document.body.appendChild(div)

// 该函数渲染Confirm组件，标题和文本
// 函数的返回值是promise对象
export default ({ title, text }) => {
  // 导入创建的组件
  // 使用createVNode创建虚拟结点
  // 准备一个dom容器装在组件
  // 使用render函数渲染组件到容器
  return new Promise((resolve, reject) => {
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 1. 渲染组件
    // 2. 点击确认按钮，触发resolve同时销毁组件
    // 3. 点击取消按钮，触发reject同时销毁组件
    const vnode = createVNode(Confirm, {
      title,
      text,
      submitCallback,
      cancelCallback
    })
    render(vnode, div)
  })
}
