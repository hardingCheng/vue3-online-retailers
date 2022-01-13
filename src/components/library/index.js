// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：Vue3.0没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import Skeleton from './skeleton'
import Carousel from './carousel'
import More from './more'
import Bread from './bread'
import defineDirective from './directive'
export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    app.component(Skeleton.name, Skeleton)
    app.component(Carousel.name, Carousel)
    app.component(More.name, More)
    app.component(Bread.name, Bread)
    // 指令
    defineDirective(app)
  }
}
