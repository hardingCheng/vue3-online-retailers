<template>
  <div class="bread">
    <div class="bread-item">
      <router-link to="/">首页</router-link>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <div class="bread-item" v-if="parentName">
      <router-link v-if="parentPath" :to="parentPath">{{
        parentName
      }}</router-link>
      <span v-else>{{ parentName }}</span>
    </div>
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <div class="bread-item">
      <span><slot /></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Bread',
  props: {
    // 父级类别的名称
    parentName: {
      type: [String, Object],
      default: ''
    },
    // 父级类别的路径
    parentPath: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
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
  }
}
</style>
