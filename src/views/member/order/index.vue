<template>
  <div class="member-order">
    <Tabs v-model="activeName" @tab-click="tabClick">
      <TabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        >{{ item.label }}</TabsPanel
      >
    </Tabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem
        v-for="item in orderList"
        :key="item.id"
        :order="item"
        @on-cancel-order="onCancelOrder(item)"
        @on-delete-order="onDeleteOrder(item)"
        @on-confirm-order="onConfirmOrder(item)"
      />
    </div>
    <!-- 分页组件 -->
    <Pagination
      v-if="total > requestParams.pageSize"
      @current-change="requestParams.page = $event"
      :total="total"
      :page-size="requestParams.pageSize"
      :current-page="requestParams.page"
    />
  </div>
  <!-- 对于像：对话框，消息提示，确认提示，通知组件 适合使用传送门 Teleport -->
  <Teleport to="#dailog">
    <OrderCancel ref="orderCancelCom" />
  </Teleport>
  <!-- 查看物理组件 -->
  <Teleport to="#dailog">
    <OrderLogistics ref="logisticsOrderCom" />
  </Teleport>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import { delteOrder, findOrderList, confirmOrder } from '@/api/order'
import OrderItem from './components/order-item'
import OrderCancel from './components/order-cancel'
import OrderLogistics from './components/order-logistics'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
export default {
  name: 'MemberOrder',
  components: { OrderItem, OrderCancel, OrderLogistics },
  setup() {
    const activeName = ref('all')
    // 筛选条件
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 订单列表
    const orderList = ref([])
    const total = ref(0)
    const loading = ref(true)
    const findOrderListFn = () => {
      loading.value = true
      findOrderList(requestParams).then((data) => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }
    watch(
      requestParams,
      () => {
        findOrderListFn()
      },
      { immediate: true }
    )

    const tabClick = (tab) => {
      // 此时：tab.index 就是订单的状态
      requestParams.orderState = tab.index
      requestParams.page = 1
    }

    // 分页事件
    const changePager = (np) => {
      requestParams.page = np
    }

    // 封装逻辑-取消订单
    const useCancelOrder = () => {
      const orderCancelCom = ref(null)
      const onCancelOrder = (item) => {
        // item 就是你要取消的订单
        orderCancelCom.value.open(item)
      }
      return { onCancelOrder, orderCancelCom }
    }
    // 删除订单
    const onDeleteOrder = (item) => {
      Confirm({ text: '您确认删除该条订单吗？' })
        .then(() => {
          delteOrder([item.id]).then(() => {
            Message({ text: '删除订单成功', type: 'success' })
            findOrderListFn()
          })
        })
        .catch((e) => {})
    }
    // 封装逻辑-确认收货
    const useConfirmOrder = () => {
      const onConfirmOrder = (item) => {
        // item 就是你要确认收货的订单
        Confirm({ text: '您确认收到货吗？确认后货款将会打给卖家。' }).then(
          () => {
            confirmOrder(item.id).then(() => {
              Message({ text: '确认收货成功', type: 'success' })
              // 确认收货后状态变成 待评价
              item.orderState = 4
            })
          }
        )
      }
      return { onConfirmOrder }
    }
    // 封装逻辑-查看物流
    const useLogisticsOrder = () => {
      const logisticsOrderCom = ref(null)
      const onLogisticsOrder = (item) => {
        logisticsOrderCom.value.open(item)
      }
      return { onLogisticsOrder, logisticsOrderCom }
    }
    return {
      activeName,
      orderStatus,
      tabClick,
      orderList,
      total,
      requestParams,
      loading,
      changePager,
      onDeleteOrder,
      ...useCancelOrder(),
      ...useConfirmOrder(),
      ...useLogisticsOrder()
    }
  }
}
</script>

<style lang="scss" scoped>
.member-order {
  height: 100%;
  background-color: #fff;
}
.order-list {
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
