// 类似element-ui一样封装
<template>
  <div class="bread-item">
    <router-link v-if="to" :to="to"><slot></slot></router-link>
    <span v-else><slot></slot></span>
  </div>
  <i class="iconfont icon-angle-right"></i>
</template>
<script>
export default {
  name: 'BreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
