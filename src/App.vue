<template>
  <!-- 轮播消息 -->
  <van-notice-bar
    left-icon="volume-o"
    scrollable
    text="由于网易云接口的原因，某些音乐的获取会出现问题导致无法正常播放，属正常现象，请另选择其他曲目进行播放"
    mode="closeable"
  />
  <router-view :key="$route.fullPath" />
  <!-- <ItemPlay></ItemPlay> -->
  <ItemPlay />
</template>
<script setup>
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
}

/* .banner-mid {
  margin: 2px;
  height: 200px;

  background-color: pink;
} */
</style>
