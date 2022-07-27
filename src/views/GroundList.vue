// 歌单广场组件
<template>
  <ground-top class="sticky_top"></ground-top>
  <ground-mid></ground-mid>
</template>

<script>
// import GroundMid from '@/components/home/songground/GroundMid.vue'
export default {
  // components: { GroundMid }
}
</script>
<style scoped>
.sticky_top {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>