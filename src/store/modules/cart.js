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
import {
  getNewCartGoods,
  mergeCart,
  findCartList,
  deleteCart,
  updateCart,
  checkAllCart,
  insertCart
} from '@/api/cart'

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
    },
    // 修改购物车商品
    updateCart(state, goods) {
      // goods中字段有可能不完整，goods有的信息才去修改。
      // 1. goods中必需又skuId，才能找到对应的商品信息
      const updateGoods = state.list.find((item) => item.skuId === goods.skuId)
      for (const key in goods) {
        // 布尔类型 false 值需要使用
        if (
          goods[key] !== null &&
          goods[key] !== undefined &&
          goods[key] !== ''
        ) {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex((item) => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 设置购物车列表
    setCartList(state, list) {
      state.list = list
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
    },
    // 获取购物车列表
    findCartList(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          findCartList().then((data) => {
            ctx.commit('setCartList', data.result)
            resolve()
          })
        } else {
          // 本地
          // Promise.all() 可以并列发送多个请求，等所有请求成功，调用then
          // Promise.race() 可以并列发送多个请求，等最快的请求成功，调用then
          // 传参事promise数组
          const promiseArr = ctx.state.list.map((item) => {
            // 返回接口函数的调用
            return getNewCartGoods(item.skuId)
          })
          Promise.all(promiseArr)
            .then((dataArr) => {
              // dataArr结果顺序和promiseArr顺序一致的，又是根据state.list 一致
              dataArr.forEach((data, i) => {
                ctx.commit('updateCart', {
                  skuId: ctx.state.list[i].skuId,
                  ...data.result
                })
              })
              resolve()
            })
            .catch((e) => {
              reject(e)
            })
        }
      })
    },
    // 删除购物车商品
    deleteCart(ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          deleteCart([skuId])
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 本地
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    // 修改购物车商品
    updateCart(ctx, goods) {
      // goods 中：必须有skuId，其他想修改的属性 selected  count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          updateCart(goods)
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 本地
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },
    // 做有效商品的全选&反选
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          const ids = ctx.getters.validList.map((item) => item.skuId)
          checkAllCart({ selected, ids })
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 本地
          // 1. 获取有效的商品列表，遍历的去调用修改mutations即可
          ctx.getters.validList.forEach((item) => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量删除选中商品
    batchDeleteCart(ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          // 得到需要删除的商品列表（失效，选中）的skuId集合
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(
            (item) => item.skuId
          )
          deleteCart(ids)
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 本地
          // 1. 获取选中商品列表，进行遍历调用deleteCart mutataions函数
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(
            (item) => {
              ctx.commit('deleteCart', item.skuId)
            }
          )
          resolve()
        }
      })
    },
    // 修改sku规格函数
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          // 1. 获取原先商品的数量
          // 2. 删除原先商品
          // 3. 获取修改的skuId 和 原先商品数量 做一个加入购物车操作
          // 4. 更新列表
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          )
          deleteCart([oldSkuId])
            .then(() => {
              return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
            })
            .then(() => {
              return findCartList()
            })
            .then((data) => {
              ctx.commit('setCartList', data.result)
              resolve()
            })
        } else {
          // 本地
          // 但你修改了sku的时候其实skuId需要更改，相当于把原来的信息移出，创建一条新的商品信息。
          // 1. 获取旧的商品信息
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          )
          // 2. 删除旧的商品
          ctx.commit('deleteCart', oldSkuId)
          // 3. 合并一条新的商品信息
          const {
            skuId,
            price: nowPrice,
            inventory: stock,
            specsText: attrsText
          } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          // 4. 去插入即可
          ctx.commit('insertCart', newGoods)
        }
      })
    },
    // 合并本地购物车
    async mergeLocalCart(ctx) {
      // 存储token后调用合并API接口函数进行购物合并
      const cartList = ctx.getters.validList.map(
        ({ skuId, selected, count }) => {
          return { skuId, selected, count }
        }
      )
      await mergeCart(cartList)
      // 合并成功将本地购物车删除
      ctx.commit('setCartList', [])
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
    },
    // 无效商品列表
    invalidList(state) {
      return state.list.filter((item) => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList(state, getters) {
      return getters.validList.filter((item) => item.selected)
    },
    // 选中商品件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount(state, getters) {
      return (
        getters.selectedList.reduce(
          (p, c) => p + c.nowPrice * 100 * c.count,
          0
        ) / 100
      )
    },
    // 是否全选
    isCheckAll(state, getters) {
      return (
        getters.validList.length === getters.selectedList.length &&
        getters.selectedList.length !== 0
      )
    }
  }
}
