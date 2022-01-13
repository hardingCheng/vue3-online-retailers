<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem to="/category/1005001">电器</BreadItem>
        <BreadItem>空调</BreadItem>
      </Bread>
      <!-- 轮播图 -->
      <!-- 全部分类 -->
      <!-- 各分类推荐商品 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopCategory'
}
</script>
<style scoped lang="scss"></style>
