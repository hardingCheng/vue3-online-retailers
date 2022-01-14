<template>
  <div class="checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'
// ue3.0中v-model会拆解成   ====>  :modelValue  +   @update:modelValue
export default {
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // 自己实现
    // const checked = ref(false)
    // const changeChecked = () => {
    //   checked.value = !checked.value
    //   // 使用emit通知父组件数据的改变
    //   emit('update:modelValue', checked.value)
    // }
    // // 使用侦听器，得到父组件传递数据，给checked数据
    // watch(
    //   () => props.modelValue,
    //   () => {
    //     checked.value = props.modelValue
    //   },
    //   { immediate: true }
    // )
    // 使用useVModel实现双向数据绑定v-model指令
    // 1. 使用props接收modelValue
    // 2. 使用useVModel来包装props中的modelValue属性数据
    // 3. 在使用checked.value就是使用父组件数据
    // 4. 在使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件
      // 在使用checked.value就是使用父组件数据
      // 在使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')
      checked.value = newVal
      // 让组件支持change事件
      emit('change', newVal)
    }
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="scss">
.checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: $mainColor;
    ~ span {
      color: $mainColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
