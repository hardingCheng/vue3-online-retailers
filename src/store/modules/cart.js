// 购物车状态
// 购物车的各种操作都会有两种状态的区分，但是不会在组件中去区分。
// 而是在封装在vuex中的actions中去区分，在组件上只需调用actions即可。
// 在actions中通过user信息去区分登录状态
// 未登录，通过mutations修改vuex中的数据即可，vuex已经实现持久化，会同步保持在本地。
// 已登录，通过api接口去服务端操作，响应成功后通过mutations修改vuex中的数据即可，它也会同步在本地。
// 不管何种操作何种状态返回一个promise，然后组件能够判断操作是否完毕是否成功，再而去做其他事情。

// 登录后，需要合并本地购物车到服务端。
// 退出后，清空vuex数据也会同步清空本地数据。

// 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
// 线上：比上面多 isCollect 有用 discount 无用 两项项信息
export default {
  namespaced: true,
  state: () => {
    return {
      list: []
    }
  },
  mutations: {
    // 先找下是否有相同的商品
    // 如果有相同的商品，查询它的数量，累加到payload上，再保存最新位置，原来商品需要删除
    // 如果没有相同的商品。保存在最新位置就可以了
    insertCart(state, goods) {
      console.log(goods)
      const sameIndex = state.list.findIndex(
        (item) => item.skuId === goods.skuId
      )
      // 逻辑：有相同的给goods累加数量，删除相同skuId的商品
      if (sameIndex >= 0) {
        goods.count = state.list[sameIndex].count + goods.count
        state.list.splice(sameIndex, 1)
      }
      state.list.unshift(goods)
    }
  },
  actions: {
    insertCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录 TODO
        } else {
          // 未登录
          ctx.commit('insertCart', goods)
          resolve()
        }
      })
    }
  },
  getters: {
    // 有效商品列表
    validList(state) {
      // 有效商品：库存大于0  stock 商品有效标识 true isEffective
      return state.list.filter((item) => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      return (
        getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) /
        100
      )
    }
  }
}
