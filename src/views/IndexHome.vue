// 主页“发现”的组件
<template>
  <!-- 轮播消息 -->
  <van-notice-bar
    left-icon="volume-o"
    scrollable
    text="由于网易云接口的原因，某些音乐的获取会出现问题导致无法正常播放，属正常现象，请另选择其他曲目进行播放"
    mode="closeable"
  />
  <top-nav></top-nav>
  <index-find></index-find>
</template>
<script setup>
// import TopNav from '@/components/home/TopNav.vue'
// import IndexFind from '@/components/home/IndexFind.vue'
</script>
<style scoped>
</style>
