<template>
  <div class="home-banner">
    <Carousel auto-play :sliders="sliders" />
  </div>
</template>
<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
export default {
  name: 'HomeBanner',
  setup() {
    const sliders = ref([])
    findBanner().then((data) => {
      sliders.value = data.result
    })
    return { sliders }
  }
}
</script>
<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
