<template>
  <div class="steps">
    <div class="steps-item active" v-for="i in 5" :key="i">
      <div class="step">
        <span>{{ i }}</span>
      </div>
      <div class="title">提交订单</div>
      <div class="desc">2021-03-18 02:11:47</div>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'Steps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  render() {
    const { ctx } = getCurrentInstance()
    const items = ctx.$slots.default()
    const dynamicItems = []
    items.forEach((item) => {
      if (item.type.name === 'StepsItem') {
        dynamicItems.push(item)
      } else {
        item.children.forEach((c) => {
          dynamicItems.push(c)
        })
      }
    })
    const itemsJsx = dynamicItems.map((item, i) => {
      return (
        <div class="steps-item" class={{ active: i < item.props.active }}>
          <div class="step">
            <span>{i + 1}</span>
          </div>
          <div class="title">{item.props.title}</div>
          <div class="desc">{item.props.desc}</div>
        </div>
      )
    })
    return <div class="steps">{itemsJsx}</div>
  }
}
</script>
<style lang="scss" scoped>
.steps {
  display: flex;
  text-align: center;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: $mainColor;
          background: $mainColor;
          color: #fff;
        }
        &::before,
        &::after {
          background: $mainColor;
        }
      }
      .title {
        color: $xtxColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,
      &::before {
        content: '';
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
