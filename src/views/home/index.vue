<template>
  <div class="page-home">
    <!-- 首页入口 -->
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner }
}
</script>
<style scoped lang="scss"></style>
