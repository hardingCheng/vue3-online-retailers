<template>
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <!-- 因为使用了两次AppHeaderNav，共同的开关。需要满足条件才给使用 -->
    <div class="container" v-show="y >= 78">
      <router-link class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>
<script>
// import { onMounted, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import AppHeaderNav from './app-header-nav'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup() {
    // 记录y轴的卷曲高度
    // 传统
    // const y = ref(0)
    // onMounted(() => {
    //   window.onscroll = () => {
    //     const scrollTop = document.documentElement.scrollTop
    //     y.value = scrollTop
    //   }
    // })
    const { y } = useWindowScroll()
    return { y }
  }
}
</script>
<style scoped lang="scss">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 100px;
    height: 80px;
    background: url(../assets/logo.png) no-repeat right 2px;
    background-size: 80px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $mainColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: mainColor;
      }
    }
  }
}
</style>
