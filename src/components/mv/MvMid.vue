<template>
  <div class="video_div">
    <div class="nav-left">
      <span
        class="iconfont icon-direction-left"
        @click="this.$router.back(-1)"
      ></span>
    </div>

    <video :src="states.mvUrl" controls></video>
  </div>
  <div class="artists">
    <div class="artists_detailed">
      <div class="artists_img">
        <img :src="states.singerDetail.cover" alt="" />
      </div>
      <div>{{ states.detail.artistName }}</div>
    </div>
    <div class="artists_songname">{{ states.detail.name }}</div>
    <div class="comments">
      <span>{{ states.detail.playCount }}次观看</span
      ><span>{{ ' ' + states.detail.publishTime }}</span>
    </div>
  </div>

  <div class="simi_mv">
    <div
      v-for="item in states.simiMv"
      :key="item"
      class="simi_item"
      @click="clickMv(item)"
    >
      <div class="left_pic"><img :src="item.cover" alt="" /></div>
      <div style="margin-left: 0.5rem">
        <div>{{ item.name }}</div>
        <div style="font-size: 0.8rem">{{ item.artistName }}</div>
        <div>
          <span style="font-size: 0.5rem; color: rgb(150, 150, 150)"
            >{{ item.playCount }}播放</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { default: router } = require('@/router')
const { default: axios } = require('@/utils/axios')
const { onMounted, reactive } = require('@vue/runtime-core')
const { useRoute } = require('vue-router')
const route = useRoute()
const mvId = route.params.id
const states = reactive({
  detail: {}, // mv详细
  mvUrl: '', // mv的url
  singerDetail: {}, // 歌手的详细
  simiMv: [] // 相似mv数组
})
// 根据mv的id获取mv的详细信息
async function getMvDetail() {
  const res = await axios.get(`/mv/detail?mvid=${mvId}`)
  console.log('mv:', res)
  states.detail = res.data
  getSingerDetail(states.detail.artistId)
}
// 获取mv的id所对应的播放地址
async function getMvUrl() {
  const res = await axios.get(`/mv/url?id=${mvId}`)
  states.mvUrl = res.data.url
}
// 获取mv的singer的详细
async function getSingerDetail(id) {
  const res = await axios.get(`/artist/detail?id=${id}`)
  console.log('singer:', res)
  states.singerDetail = res.data.artist
}
// 获取相似mv的方法
async function getSimiMv() {
  const res = await axios.get(`/simi/mv?mvid=${mvId}`)
  console.log('simi:', res)
  states.simiMv = res.mvs
}
function clickMv(item) {
  // router.push('/')
  // console.log(item)
  router.push(`/mv/${item.id}`)
}
onMounted(() => {
  getMvDetail()
  getMvUrl()
  getSimiMv()
})
</script>
<style scoped>
.nav-left {
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 00.5rem 1rem 0.5rem 1rem;
  font-size: 1.125rem;
  height: 1.6rem;
  line-height: 1.6rem;
  background-color: transparent;
  /* background-color: rgba(0, 0, 0, 0.05); */
  z-index: 1;
}
.nav-left span {
  color: #f3d19e;
}
.iconfont {
  color: #f3d19e;
  font-size: 1.5rem;
  margin-right: 1.2rem;
}
.video_div {
  position: relative;
}
.video_div video {
  width: 100%;
}
.artists {
  margin: 0.5rem;
}
.artists .artists_img {
  width: 3rem;
  height: 3rem;
}
.artists div img {
  height: 100%;
  width: 100%;
  border-radius: 1.5rem;
}
.artists_detailed {
  display: flex;
  align-items: center;
}
.artists_songname {
  font-size: 1rem;
}
.comments {
  font-size: 0.8rem;
  color: rgb(150, 150, 150);
}
.simi_mv {
  margin-left: 0.5rem;
  margin-bottom: 3rem;
}
.simi_item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.5rem;
  height: 4.5rem;
}
.simi_item .left_pic {
  height: 100%;
}
.simi_item .left_pic img {
  height: 100%;
  border-radius: 0.5rem;
}
</style>