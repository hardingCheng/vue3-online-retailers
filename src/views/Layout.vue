<template>
  <AppTopnav />
  <nav>顶部通栏</nav>
  <header>头部</header>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>
<script>
import AppTopnav from '@/components/app-topnav'
export default {
  name: 'Layout',
  components: { AppTopnav }
}
</script>
<style lang="scss" scoped></style>
