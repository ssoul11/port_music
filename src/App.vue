<template>
  <!-- <ItemPlay></ItemPlay> -->
  <router-view :key="$route.fullPath" />

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
