<template>
  <div v-if="states.songs.length < 1" class="load_icon">
    <van-loading type="spinner" size="5rem" color="#333" />
  </div>
  <div v-else>
    <div class="singer_bg">
      <img :src="states.singerPro.cover" alt="" class="singer_cover" />
      <div class="singer_name">
        <p>{{ states.singerPro.name }}</p>
      </div>
    </div>
    <div class="singer_item">
      <van-tabs v-model:active="states.active" swipeable>
        <van-tab title="主页" class="singer_desc">
          <div>
            <p>歌手描述</p>
            <p>{{ states.singerPro.briefDesc }}</p>
          </div></van-tab
        >
        <van-tab title="歌曲">
          <SongList
            v-for="(song, index) in states.songs"
            :key="song"
            :oneSong="song"
            :index="index"
            @click="getClickIndex(index)"
          ></SongList
        ></van-tab>
        <van-tab title="专辑">
          <van-list
            v-model:loading="states.loading"
            :finished="states.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="item in states.albums"
              :key="item"
              class="album_item"
              @click="clickAlbum(item.id)"
            >
              <div class="albumpic_item">
                <img class="album_pic" :src="item.blurPicUrl" alt="" /><img
                  class="album_botm"
                  src="@/assets/disc.png"
                  alt=""
                />
              </div>
              <div class="album_time">
                <p class="first_p">{{ item.name }}</p>
                <p class="second_p">
                  {{ formatDate(item.publishTime) }} {{ item.size }}首
                </p>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
const { default: axios } = require('@/utils/axios')
const { onMounted, reactive } = require('@vue/runtime-core')
const { useRoute } = require('vue-router')
const route = useRoute()
import router from '@/router'
import store from '@/store'
import formatDate from '@/utils/date'

// 通过route动态路由匹配获取传入的歌手id参数
const singerId = route.params.id
const states = reactive({
  singerPro: {},
  albumSize: 0,
  active: 0,
  songs: [],
  albums: [],
  offset: 0,
  loading: false,
  finished: false
})

async function getSingerDec() {
  const res = await axios.get(`/artist/detail?id=${singerId}`)
  // console.log(res)
  states.singerPro = res.data.artist
  states.albumSize = res.data.albumSize
}
async function getSingerMc() {
  const res = await axios.get(`/artist/top/song?id=${singerId}`)
  // console.log(res)
  states.songs = res.songs
}
async function getSingerAlbum(limit) {
  const res = await axios.get(
    `/artist/album?id=${singerId}&offset=${states.offset}&limit=${limit}`
  )
  console.log(res)
  states.offset += limit
  states.albums = [...states.albums, ...res.hotAlbums]
  states.loading = false
}
const onLoad = () => {
  // console.log(111)
  // 异步更新数据
  getSingerAlbum(5)
  if (states.albums.length >= states.albumSize) {
    states.finished = true
  }
}
// 在点击歌单中歌曲时触发
const getClickIndex = (value) => {
  // console.log(value)
  store.commit('changeplayList', states.songs)
  store.commit('changeplayIndex', value)
}
const clickAlbum = (id) => {
  router.push(`/album/${id}?type=1`)
}

onMounted(() => {
  getSingerDec()
  getSingerMc()
  getSingerAlbum(5)
})
</script>

<style scoped>
.singer_bg {
  position: relative;
  height: 16rem;
}
.singer_cover {
  position: absolute;
  top: -3rem;
  width: 100%;
}
.singer_name {
  position: absolute;
  width: 80%;
  height: 5rem;
  left: 10%;
  bottom: 0;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 0px rgb(200, 200, 200);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.singer_item {
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
}
.album_item {
  margin-top: 1rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.albumpic_item {
  position: relative;
  height: 5rem;
  width: 5rem;
}
.albumpic_item .album_pic {
  width: 100%;
  border-radius: 0.5rem;
}
.albumpic_item .album_botm {
  height: 100%;

  position: absolute;
  left: 0;
  top: -0.7rem;
  z-index: -1;
}
.singer_desc {
  padding: 0 1rem 0 1rem;
}
.album_time {
  margin-left: 1rem;
}
.album_time .second_p {
  font-size: 0.8rem;
  color: rgb(150, 150, 150);
}
.load_icon {
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
