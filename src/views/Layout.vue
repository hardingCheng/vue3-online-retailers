<template>
  <AppTopnav />
  <AppHeader />
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <AppFooter />
</template>
<script>
import { useStore } from 'vuex'
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
export default {
  name: 'Layout',
  components: { AppTopnav, AppHeader, AppFooter },
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style lang="scss" scoped></style>
