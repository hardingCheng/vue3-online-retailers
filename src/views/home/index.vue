<template>
  <div class="container">home</div>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixins.scss';
.container {
  height: 30px;
  @include hoverShadow;
}
</style>
