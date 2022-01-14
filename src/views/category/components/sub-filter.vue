<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <!-- 第一行 -->
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="changeBrand(brand.id)"
          :class="{ active: filterData.selectedBrand === brand.id }"
          href="javasript:;"
          v-for="brand in filterData.brands"
          :key="brand.id"
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <!-- 第一 ~ N行 -->
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{ p.name }}：</div>
      <div class="body">
        <a
          @click="changeAttr(p, attr.id)"
          :class="{ active: p.selectedProp === attr.id }"
          href="javasript:;"
          v-for="attr in p.properties"
          :key="attr.id"
          >{{ attr.name }}</a
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <Skeleton class="item" width="800px" height="40px" />
    <Skeleton class="item" width="800px" height="40px" />
    <Skeleton class="item" width="600px" height="40px" />
    <Skeleton class="item" width="600px" height="40px" />
    <Skeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'SubFilter',
  setup(props, { emit }) {
    // 1. 获取数据
    // 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
    // 3. 完成渲染
    const route = useRoute()
    const filterData = ref(null)
    const filterLoading = ref(false)
    watch(
      () => route.params.id,
      (newVal, oldVal) => {
        // 当你从二级分类去顶级分类也会拿到ID，不能去加载数据因为它不是二级分类的ID
        if (newVal && route.path === '/category/sub/' + newVal) {
          filterLoading.value = true
          newVal &&
            findSubCategoryFilter(route.params.id).then(({ result }) => {
              // 品牌全部
              // 选中的品牌
              result.selectedBrand = null
              result.brands.unshift({ id: null, name: '全部' })
              // 销售属性全部
              result.saleProperties.forEach((p) => {
                // 选中的子类目
                p.selectedProp = null
                p.properties.unshift({ id: null, name: '全部' })
              })
              filterData.value = result
              filterLoading.value = false
            })
        }
      },
      { immediate: true }
    )
    // 获取筛选参数
    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      filterParams.brandId = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach((p) => {
        const attr = p.properties.find((attr) => attr.id === p.selectedProp)
        if (attr && attr.id !== undefined) {
          attrs.push({ groupName: p.name, propertyName: attr.name })
        }
      })
      if (attrs.length) filterParams.attrs = attrs
      return filterParams
    }
    // 选择品牌
    const changeBrand = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 选中属性
    const changeAttr = (p, attrId) => {
      if (p.selectedProp === attrId) return
      p.selectedProp = attrId
      emit('filter-change', getFilterParams())
    }
    return { filterData, filterLoading, changeBrand, changeAttr }
  }
}
</script>
<style lang="scss" scoped>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: $mainColor;
        }
      }
    }
  }
}
.skeleton {
  padding: 10px 0;
}
</style>
