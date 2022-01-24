import { createRouter, createWebHashHistory } from 'vue-router'
import { h } from 'vue'
import store from '@/store'
const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub')
const Login = () => import('@/views/login/index')
const Goods = () => import('@/views/goods/index')
const Cart = () => import('@/views/cart/index')
const PayCheckout = () => import('@/views/member/pay/checkout')
const PayIndex = () => import('@/views/member/pay/index')
const payResult = () => import('@/views/member/pay/pay-result')
const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home')
const MemberOrder = () => import('@/views/member/order')
const MemberOrderDetail = () => import('@/views/member/detail')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          {
            path: '/member/order/',
            // vue3.0 需要有嵌套关系才能模糊匹配
            component: { render: () => h(<RouterView />) },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: MemberOrderDetail }
            ]
          }
        ]
      },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: PayCheckout },
      { path: '/member/pay', component: PayIndex },
      { path: '/pay/callback', component: payResult }
    ]
  },
  { path: '/login', component: Login }
]
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes,
  // 现在的路由跳转默认在当前浏览的位置（卷曲的高度），我们需要会到顶部。
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { token } = store.state.user.profile
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})
export default router
