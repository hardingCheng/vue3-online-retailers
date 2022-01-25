<template>
  <div class="detail-steps" style="padding: 20px">
    <Steps :active="order.orderState === 6 ? 1 : order.orderState">
      <StepsItem title="提交订单" :desc="order.createTime" />
      <StepsItem title="付款成功" :desc="order.payTime" />
      <StepsItem title="商品发货" :desc="order.consignTime" />
      <StepsItem title="确认收货" :desc="order.evaluationTime" />
      <StepsItem title="订单完成" :desc="order.endTime" />
    </Steps>
  </div>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  name: 'DetailSteps'
}
</script>
<style scoped lang="scss"></style>
