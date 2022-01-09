<template>
  <nav>顶部通栏</nav>
  <header>头部</header>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>
<script>
export default {
  name: 'Layout'
}
</script>
<style lang="scss" scoped></style>
