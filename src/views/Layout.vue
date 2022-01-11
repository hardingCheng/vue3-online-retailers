<template>
  <AppTopnav />
  <AppHeader />
  <AppHeaderSticky />
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
import AppHeaderSticky from '@/components/app-header-sticky'
import AppFooter from '@/components/app-footer'
export default {
  name: 'Layout',
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style lang="scss" scoped></style>
