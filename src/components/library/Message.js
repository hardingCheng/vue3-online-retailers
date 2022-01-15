// 实现使用函数调用message组件的逻辑
// 这个函数将来：导入直接使用，也可以挂载到vue实例上去
import { createVNode, render } from 'vue'
import Message from './message.vue'

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'message-container')
document.body.appendChild(div)
// 定时器标识
let timer = null

export default ({ type, text }) => {
  // 实现：根据message.vue渲染消息提示
  // 1. 导入组件
  // 2. 根据组件创建虚拟节点
  const vnode = createVNode(Message, { type, text })
  // 3. 准备一个DOM容器
  // 4. 把虚拟节点渲染DOM容器中
  render(vnode, div)
  // 5. 开启定时，移出DOM容器内容
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
