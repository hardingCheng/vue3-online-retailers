<template>
  <div class="detail-action">
    <div class="state">
      <span
        class="iconfont"
        :class="[`icon-order-${orderStatus[orderList.orderState].name}`]"
      ></span>
      <p>{{ orderStatus[orderList.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ orderList.id }}</p>
      <p>下单时间：{{ orderList.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="orderList.orderState === 1">
        <Button
          @click="$router.push('/member/pay?id=' + orderList.id)"
          type="primary"
          size="small"
          >立即付款</Button
        >
        <Button @click="onCancelOrder(order)" type="gray" size="small"
          >取消订单</Button
        >
      </template>
      <!-- 待发货 -->
      <template v-if="orderList.orderState === 2">
        <Button
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          type="plain"
          size="small"
          >再次购买</Button
        >
      </template>
      <!-- 待收货 -->
      <template v-if="orderList.orderState === 3">
        <Button @click="onConfirmOrder(order)" type="primary" size="small"
          >确认收货</Button
        >
        <Button type="plain" size="small">再次购买</Button>
      </template>
      <!-- 待评价 -->
      <template v-if="orderList.orderState === 4">
        <Button
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          type="plain"
          size="small"
          >再次购买</Button
        >
        <Button type="plain" size="small">评价商品</Button>
        <Button type="gray" size="small">申请售后</Button>
      </template>
      <!-- 已完成 -->
      <template v-if="orderList.orderState === 5">
        <Button
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          type="plain"
          size="small"
          >再次购买</Button
        >
        <Button type="plain" size="small">查看评价</Button>
        <Button type="gray" size="small">申请售后</Button>
      </template>
      <!-- 已取消 -->
    </div>
  </div>
  <!-- 取消订单组件 -->
  <Teleport to="#dailog">
    <OrderCancel ref="orderCancelCom" />
  </Teleport>
</template>
<script>
import { ref } from 'vue'
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import { orderStatus } from '@/api/constants'
import OrderCancel from './order-cancel'
import { useCancelOrder } from '../index'
export default {
  name: 'OrderDetailPage',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    OrderCancel
  },
  setup() {
    const orderList = ref(null)
    const route = useRoute()
    findOrder(route.params.id).then((data) => {
      orderList.value = data.result
    })
    return { orderList, orderStatus, ...useCancelOrder() }
  }
}
</script>
<style lang="scss" scoped>
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: $xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .button {
      margin-left: 20px;
    }
  }
}
</style>
