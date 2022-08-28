// 专辑详细页面的头部组件
<template>
  <div class="nav-top">
    <div>
      <span
        class="iconfont icon-direction-left"
        @click="this.$router.back(-1)"
      ></span
      ><span>专辑</span>
    </div>
  </div>
</template>

<script setup>
</script>
<style scoped>
.nav-top {
  display: flex;
  justify-content: space-between;
  padding: 00.5rem 1rem 0.5rem 1rem;
  font-size: 1.125rem;
  height: 1.6rem;
  line-height: 1.6rem;
  color: #f3d19e;
  background-color: #333;
}
a {
  color: #f3d19e;
}
.iconfont {
  color: #f3d19e;

  font-size: 1.5rem;
  margin-right: 1.2rem;
}
</style>
