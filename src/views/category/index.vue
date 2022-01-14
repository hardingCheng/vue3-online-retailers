<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <!-- <Transition name="fade-right" mode="out-in">
          <BreadItem v-if="topCategory.name" :key="topCategory.id">{{
            topCategory.name
          }}</BreadItem>
        </Transition> -->
        <BreadItem v-if="topCategory.name" :key="topCategory.id">{{
          topCategory.name
        }}</BreadItem>
      </Bread>
      <!-- 轮播图 -->
      <Carousel :sliders="sliders" style="height: 500px" />
      <!-- 全部分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各分类推荐商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <More />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsItem from './components/goods-item'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup() {
    // 轮播图
    const sliders = ref([])
    findBanner().then((data) => {
      sliders.value = data.result
      console.log(sliders)
    })

    // 面包屑+所有分类
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      let cate = {}
      const item = store.state.category.list.find((item) => {
        // 顶级分类的ID
        return item.id === route.params.id
      })
      if (item) cate = item
      return cate
    })
    // 推荐商品
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children
      })
    }
    // 监听路由id来切换数据
    // 定义API，组件初始化要去加载数据，但是动态路由不会重新初始化组件。
    // 如果监听地址栏id的变化，然后变化了就去加载数据，但是初始化有不会加载了。
    // 不过watch提供了 immediate: true 可让watch初始化的时候主动触发一次。
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/${newVal}` === route.path) getSubList()
      },
      { immediate: true }
    )

    return {
      sliders,
      topCategory,
      subList
    }
  }
}
</script>
<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $mainColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
