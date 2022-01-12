<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position: relative; height: 426px">
      <Transition name="fade">
        <ul v-if="list.length" ref="pannel" class="goods-list">
          <li v-for="item in list" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </router-link>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>
<script>
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { findHot } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup() {
    const { target, result } = useLazyData(findHot)
    return { target, list: result }
  }
}
</script>
<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    @include hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
