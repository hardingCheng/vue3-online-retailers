<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? '同类商品推荐' : '猜你喜欢' }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <Carousel :sliders="sliders" style="height: 380px" auto-play />
  </div>
</template>

<script>
import { ref } from 'vue'
import { findRelGoods } from '@/api/goods'
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    const sliders = useRelGoodsData(props.goodsId)
    return { sliders }
  }
}
// 得到需要的数据
const useRelGoodsData = (id) => {
  const sliders = ref([])
  findRelGoods(id).then((data) => {
    // 每页4条
    const size = 4
    const total = Math.ceil(data.result.length / size)
    for (let i = 0; i < total; i++) {
      sliders.value.push(data.result.slice(i * size, (i + 1) * size))
    }
  })
  return sliders
}
</script>

<style scoped lang="scss">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid $mainColor;
      border-right: 4px solid $mainColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten($mainColor, 40%);
      }
    }
  }
}
// vue3.0使用深度作用选择器写法 :deep(选择器)
:deep(.carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: $mainColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
