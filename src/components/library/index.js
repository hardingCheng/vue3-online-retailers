// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：Vue3.0没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

// import Skeleton from './skeleton'
// import Carousel from './carousel'
// import More from './more'
// import Bread from './bread'
// import BreadItem from './bread-item.vue'
import defineDirective from './directive'
import Message from './Message.js'
// export default {
//   install(app) {
//     // 在app上进行扩展，app提供 component directive 函数
//     // 如果要挂载原型 app.config.globalProperties 方式
//     app.component(Skeleton.name, Skeleton)
//     app.component(Carousel.name, Carousel)
//     app.component(More.name, More)
//     app.component(Bread.name, Bread)
//     app.component(BreadItem.name, BreadItem)
//     // 指令
//     defineDirective(app)
//   }
// }

// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
// console.dir(importFn.keys()) 文件名称数组
export default {
  install(app) {
    // 批量注册全局组件
    importFn.keys().forEach((key) => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })

    // 定义指令
    defineDirective(app)
    // 如果你想挂载全局的属性，能够通过组件实例调用的属性   this.$message
    app.config.globalProperties.$message = Message // 原型函数
  }
}
// require.context() 是webpack提供的一个自动导入的API
// 参数1：加载的文件目录
// 参数2：是否加载子目录
// 参数3：正则，匹配文件
// 返回值：导入函数 fn
// keys() 获取读取到的所有文件列表
