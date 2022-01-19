<template>
  <div class="numbox">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="numbox">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="modelValue" />
      <a href="javascript:;" @click="changeNum(+1)">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'Numbox',
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    }
  },
  setup(props, { emit }) {
    const num = useVModel(props, 'modelValue', emit)
    const changeNum = (value) => {
      const newValue = num.value + value
      if (newValue < props.min) return
      if (newValue > props.max) return
      num.value = newValue
      emit('change', newValue)
    }
    return { num, changeNum }
  }
}
</script>
<style lang="scss" scoped>
.numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
