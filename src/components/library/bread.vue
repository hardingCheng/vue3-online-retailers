<template>
  <div class="bread">
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent, h } from 'vue'
// 指定组件显示的内容：new Vue({选项})
// el 选项，通过一个选择器找到容器，容器内容就是组件内容
// template 选项，<div>组件内容</div> 作为组件内容
// render选项，它是一个函数，函数回默认传人createElement的函数（h），这个函数用来创建结构，再render函数返回渲染为组件内容。它的优先级更高。
export default defineComponent({
  name: 'Bread',
  render() {
    // 用法
    // 1. template 标签去除，单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的h函数传参进来的，vue3.0 的h函数导入进来
    // 4. h 第一个参数 标签名字  第二个参数 标签属性对象  第三个参数 子节点
    // 需求
    // 1. 创建bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除bread-item组件的i标签，因该由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染再bread标签中
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < items.length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'bread' }, dymanicItems)
  }
})
</script>
<style lang="scss">
// 去除scoped属性，目的：使样式作用到bread-item组件
.bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: $mainColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 可以使用最后一个item的i隐藏掉
    &:last-child {
      display: none;
    }
  }
}
</style>
