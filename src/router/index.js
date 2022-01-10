import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory }
    ]
  }
]
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes
})

export default router
