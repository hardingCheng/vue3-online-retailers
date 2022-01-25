<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <Button :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>
<script>
import Button from './components/detail-action'
export default {
  name: 'OrderDetailPage',
  components: { Button }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
