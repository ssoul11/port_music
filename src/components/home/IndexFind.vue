// 主页中间部分（发现）组件
<template>
  <!-- 轮播图 -->
  <div v-if="states.banners.length < 1" class="load_icon1">
    <van-loading type="spinner" size="4rem" color="#333" />
  </div>
  <div v-else class="banner-top">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item
        v-for="banner in states.banners"
        :key="banner"
        @click="clickBanner(banner)"
      >
        <img :src="banner.pic" style="height: 8rem; width: 100%" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <!-- 中间图标 -->
  <div class="box-mid">
    <div class="box-mid-mid">
      <div>
        <router-link to="/recmdmusic">
          <van-icon name="bookmark-o" size="2em" color="#f3d19e" />
        </router-link>
      </div>
      <span>每日推荐</span>
    </div>
    <div class="box-mid-mid">
      <router-link to="/" @click="NoUse"
        ><div>
          <van-icon name="service-o" size="2em" color="#f3d19e" /></div
      ></router-link>

      <span>私人FM</span>
    </div>
    <div class="box-mid-mid">
      <router-link to="/groundlist">
        <div>
          <van-icon name="music-o" size="2em" color="#f3d19e" />
        </div>
      </router-link>

      <span>歌单</span>
    </div>
    <div class="box-mid-mid">
      <router-link to="/toplist">
        <div>
          <van-icon name="bar-chart-o" size="2em" color="#f3d19e" />
        </div>
      </router-link>
      <span>排行榜</span>
    </div>
  </div>

  <!-- 推荐歌单小部件 -->
  <div class="recommend-plylst">
    <span>推荐歌单</span
    ><van-icon on name="arrow" size="0.9375rem" color="#f3d19e" />
  </div>

  <!-- 推荐歌单轮播部分 -->
  <div v-if="states.getPersonlizs.length < 1" class="load_icon2">
    <van-loading type="spinner" size="4rem" color="#333" />
  </div>
  <div v-else class="person-list">
    <van-swipe
      class="recommend-swipe"
      :loop="false"
      width="104"
      height="135"
      :show-indicators="false"
    >
      <van-swipe-item
        v-for="getPersonliz in states.getPersonlizs"
        :key="getPersonliz"
      >
        <!-- 采用动态路由绑定id -->
        <router-link :to="'/itemmusic/' + getPersonliz.id"
          ><div class="recommend-wipeitem">
            <span class="play-icon"
              ><van-icon name="play" />{{
                Math.floor(getPersonliz.playCount / 10000) + '万'
              }}</span
            >
            <img :src="getPersonliz.picUrl" style="height: 6rem; width: 6rem" />
            <span>{{ getPersonliz.name }}</span>
          </div></router-link
        >
      </van-swipe-item>
    </van-swipe>
  </div>

  <!-- 推荐新音乐部分 -->
  <div class="recommend-plylst">
    <span>推荐新音乐</span
    ><van-icon on name="arrow" size="0.9375rem" color="#f3d19e" />
  </div>
  <div class="newMc">
    <van-swipe class="my-swipe" :loop="false" indicator-color="black">
      <van-swipe-item class="new_item">
        <div
          class="new_item_div"
          v-for="item in states.getNewsongs.slice(0, 3)"
          :key="item"
        >
          <div class="new_item_left" @click="clickNewsongs(item)">
            <img :src="item.picUrl" alt="" />
            <div>
              <p>{{ item.song.name }}</p>
              <p>
                <span v-for="(ar, i) in item.song.artists" :key="ar"
                  ><span v-if="i > 0">/</span>{{ ar.name }}</span
                >
              </p>
            </div>
          </div>
          <span
            v-if="item.song.mvid !== 0"
            class="iconfont icon-Youtube play_icon"
          ></span>
        </div>
      </van-swipe-item>
      <van-swipe-item class="new_item"
        ><div
          class="new_item_div"
          v-for="item in states.getNewsongs.slice(3, 6)"
          :key="item"
        >
          <div class="new_item_left" @click="clickNewsongs(item)">
            <img :src="item.picUrl" alt="" />
            <div>
              <p>{{ item.song.name }}</p>
              <p>
                <span v-for="(ar, i) in item.song.artists" :key="ar"
                  ><span v-if="i > 0">/</span>{{ ar.name }}</span
                >
              </p>
            </div>
          </div>
          <span
            v-if="item.song.mvid !== 0"
            class="iconfont icon-Youtube play_icon"
          ></span>
        </div> </van-swipe-item
      ><van-swipe-item class="new_item"
        ><div
          class="new_item_div"
          v-for="item in states.getNewsongs.slice(6, 9)"
          :key="item"
        >
          <div class="new_item_left" @click="clickNewsongs(item)">
            <img :src="item.picUrl" alt="" />
            <div>
              <p>{{ item.song.name }}</p>
              <p>
                <span v-for="(ar, i) in item.song.artists" :key="ar"
                  ><span v-if="i > 0">/</span>{{ ar.name }}</span
                >
              </p>
            </div>
          </div>
          <span
            v-if="item.song.mvid !== 0"
            class="iconfont icon-Youtube play_icon"
          ></span>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>

  <!-- 推荐mv部分 -->
  <div class="recommend-plylst">
    <span>推荐mv</span
    ><van-icon on name="arrow" size="0.9375rem" color="#f3d19e" />
  </div>
  <div class="person-list">
    <van-swipe
      class="recommend-swipe"
      :loop="false"
      width="104"
      height="135"
      :show-indicators="false"
    >
      <van-swipe-item v-for="getmv in states.getNewmvs" :key="getmv">
        <div class="recommend-wipeitem" @click="clickMv(getmv)">
          <span class="play-icon"
            ><van-icon name="play" />{{ getmv.playCount }}</span
          >
          <img :src="getmv.picUrl" style="height: 6rem; width: 6rem" />
          <span>{{ getmv.name }}</span>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="index_bottom">已经到底了~~</div>
</template>

<script setup>
import { onBeforeMount, reactive } from '@vue/runtime-core'
import axios from '@/utils/axios'
import store from '@/store'
import { Toast } from 'vant'
import router from '@/router'
import { getBanners, getPersonlizs } from '@/utils/api'

// states对象响应式数据
const states = reactive({
  banners: [], // 轮播图数组
  getPersonlizs: [], // 推荐歌单数组
  getNewsongs: [], // 推荐新音乐数组
  getNewmvs: [] // 推荐mv数组
})
// 获取轮播图的数据
async function getBanner() {
  const res = await getBanners()
  states.banners = res.banners
  // console.log(res)
}
// 获取推荐歌单
async function getPersonliz() {
  const res = await getPersonlizs()
  states.getPersonlizs = res.result
  // console.log(res)
}
// 获取推荐新音乐
async function getNewsongs() {
  const res = await axios.get('/personalized/newsong?limit=9')
  // console.log(res)
  states.getNewsongs = res.result
}
// 获取推荐mv
async function getNewmvs() {
  const res = await axios.get('/personalized/mv')
  console.log(res)
  states.getNewmvs = res.result
}
// 点击轮播图播放音乐
function clickBanner(ban) {
  // console.log(store.state.playList)
  if (ban.song) {
    const tempArr = store.state.playList.slice(0)
    tempArr.splice(store.state.playIndex, 0, ban.song)
    store.commit('changeplayList', tempArr)
    // console.log('歌曲')
  } else if (ban.url) {
    window.open(ban.url)
    // console.log('url')
  } else if (ban.targetType === 10) {
    // console.log('专辑')
    router.push(`/album/${ban.targetId}?type=1`)
  }

  // store.commit('changeshowPlayer')
}

// 点击mv进入mv组件
function clickMv(item) {
  // console.log('点击了')
  router.push(`/mv/${item.id}`)
}
// 点击新音乐加入playList进行播放
function clickNewsongs(item) {
  console.log('55555')
  console.log(item)
  const obj = {}
  obj.id = item.id
  obj.name = item.name
  obj.ar = item.song.artists
  obj.al = item
  const tempArr = store.state.playList.slice(0)
  tempArr.splice(store.state.playIndex, 0, obj)
  store.commit('changeplayList', tempArr)
}
// vant组件库弹出提示框
function NoUse() {
  Toast({
    message:
      '<div style="height: 4rem;width: 15rem;display: flex;font-size:0.8rem;color: white;background-color: rgba(80,80,80);flex-direction: column;align-items: center;justify-content:space-around"><span class="iconfont icon-gantanhao" style="font-size:1rem"></span><span>该功能出现了点问题，正在紧急修复~~</span></div>',
    iconSize: '10rem',
    type: 'html',
    duration: 2000
  })
}
// 在组件挂载之前进行数据的请求
// 请求内容包括，轮播图、推荐歌单的基本信息
onBeforeMount(() => {
  getBanner()
  getPersonliz()
  getNewsongs()
  getNewmvs()
})
</script>

<style>
.banner-top {
  margin-top: 0.5rem;
}
.my-swipe .van-swipe-item {
  color: #333;
  font-size: 1.25rem;
  /* line-height: 9.375rem; */
  /* text-align: center; */
  /* background-color: #39a9ed; */
}
.van-swipe {
  width: 100%;
  /* margin: 0.0625rem; */
  /* border-radius: 1rem; */
  /* height: 4rem; */
}
.box-mid {
  display: flex;
  justify-content: space-around;
  height: 5rem;
  text-align: center;
  margin-top: 0.5rem;
  /* background-color: pink; */
  /* line-height: 50px; */
}
.box-mid-mid {
  width: 4rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
}

.box-mid-mid div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  height: 3rem;
  width: 3rem;
  border-radius: 1.5rem;
}
.recommend-plylst {
  margin-top: 0.5rem;
}
.recommend-plylst span {
  padding: 0.0625rem;
  border-left: 0.125rem solid #f3d19e;
}
.person-list {
  margin-top: 00.5rem;
}
.recommend-wipeitem img {
  display: block;
  border: 0 solid transparent;
  border-radius: 0.3rem;
}
.recommend-wipeitem {
  color: #333;
  font-size: 0.2rem;
  position: relative;
}

.recommend-wipeitem span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.play-icon {
  color: rgb(251, 251, 251);
  top: 0;
  right: 0.625rem;
  position: absolute;
}
.load_icon1 {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.load_icon2 {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.newMc {
  /* margin-bottom: 5rem; */
  /* margin: 0 0.5rem 2.5rem 0.5rem; */
}

.new_item {
  /* padding-right: 0.5rem; */
  /* width: 80%; */
  width: 300px;
  background-color: rgb(240, 240, 240);
  border-radius: 0.5rem;
}
.new_item div:last-child {
  margin-bottom: 0.5rem;
}

.new_item_div {
  display: flex;
  position: relative;
  align-items: flex-start;
  /* line-height: 5rem; */
  /* width: 100%; */
  height: 5rem;
  margin-top: 0.5rem;
  /* border-radius: 1rem; */
}

.new_item_left {
  height: 100%;
  width: 80%;
  display: flex;
}
.new_item_div img {
  margin-left: 0.5rem;
  border-radius: 0.5rem;
  height: 100%;
}
.new_item_left div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 65%;
  margin-left: 0.5rem;
}

.new_item_div .new_item_left p {
  font-size: 1rem;
  width: 100%;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  /* height: 50%; */
}
.new_item_div .new_item_left p:last-child {
  font-size: 0.8rem;
}
.new_item_div .play_icon {
  position: absolute;
  right: 10%;
  line-height: 3rem;
  font-size: 1.5rem;
}
.index_bottom {
  text-align: center;
  color: rgb(172, 172, 172);
  margin-bottom: 3rem;
}
</style>
