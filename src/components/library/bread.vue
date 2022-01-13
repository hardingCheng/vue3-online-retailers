<template>
  <div class="bread">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'Bread'
}
</script>
<style lang="scss">
// 去除scoped属性，目的：使样式作用到bread-item组件
.bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: $mainColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 可以使用最后一个item的i隐藏掉
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>
