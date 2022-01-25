<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <DetailSteps :order="order" />
    <!-- 物流栏 -->
    <Suspense v-if="[3, 4, 5].includes(order.orderState)">
      <!-- 组件加载完毕 -->
      <template #default>
        <DetailLogistics :order="order" />
      </template>
      <!-- 组件加载中显示 -->
      <template #fallback>
        <div class="loading">loading</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
    <OrderInfo :order="order" />
  </div>
</template>
<script>
import DetailAction from './components/detail-action'
import DetailSteps from './components/detail-steps'
import DetailLogistics from './components/detail-logistics'
import OrderInfo from './components/order-info'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction, DetailSteps, DetailLogistics, OrderInfo }
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
