// 歌单详细页面
<template>
  <div v-if="plyLst.songs.length < 1" class="load_icon">
    <van-loading type="spinner" size="5rem" color="#333" />
  </div>
  <div v-else>
    <div class="top-back">
      <!-- 利用图片再使用定位作为背景，通过filter进行高斯模糊 -->
      <div class="top-img">
        <img :src="plyLst.coverImgUrl" />
      </div>
      <!-- 组件中间部分的布局，包含了中间图片以及歌单名字 -->
      <div class="mid">
        <div class="mid-leftb">
          <img :src="plyLst.coverImgUrl" />
        </div>
        <div class="mid-rightb">{{ plyLst.listName }}</div>
      </div>
      <!-- 组件中间下部分的按钮：评论数、分享数以及下载多选等 -->
      <div class="bottom">
        <div>
          <span class="iconfont icon-comment"></span
          ><span>{{ plyLst.commentCount }}</span>
        </div>
        <div>
          <span class="iconfont icon-icon-test1"></span
          ><span>{{ plyLst.shareCount }}</span>
        </div>
        <div>
          <span class="iconfont icon-icon-test2"></span><span>下载</span>
        </div>
        <div><span class="iconfont icon-complete"></span><span>多选</span></div>
      </div>

      <!-- 具体的歌单部分 -->
      <div class="song-list">
        <!-- 歌单中的头部，包含播放全部以及收藏等 -->
        <div class="list-top">
          <div class="list-licon" @click="getClickIndex(0)">
            <div class="list-licon-icon"><van-icon name="play-circle-o" /></div>
            <div class="list-licon-play">
              <span class="play"
                >播放全部<span class="word"
                  >(共{{ plyLst.songs.length }}首)</span
                ></span
              >
            </div>
          </div>

          <span class="list-ricon"
            ><van-icon name="plus" />收藏({{
              Math.floor(plyLst.subscribedCount / 10000) + '万'
            }})</span
          >
        </div>
        <!-- 通过v-for对每首歌跟歌单进行循环 -->
        <div>
          <div class="list-bottom">
            <SongList
              v-for="(song, index) in plyLst.songs"
              :key="song"
              :oneSong="song"
              :index="index"
              @click="getClickIndex(index)"
            ></SongList>
            <!-- <div v-for="song in plyLst.songs" :key="song">{{ item }}</div> -->
          </div>
        </div>
        <div class="list-sub"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 由于vue3是composition api开发，所以使用路由$route不能像vue2那样this了
import { onBeforeMount, reactive } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import axios from '@/utils/axios'
import store from '@/store'
// import SongList from '@/components/slist/SongList.vue'

const route = useRoute()
// 根据传入的type值判断是歌单还是专辑,如果有则为专辑
const listType = route.query.type
// 通过route动态路由匹配获取传入的id参数
const listId = route.params.id
const plyLst = reactive({
  listName: '',
  commentCount: 0,
  shareCount: 0,
  playCount: 0,
  coverImgUrl: '',
  subscribedCount: 0,
  songs: []
})
// 通过动态路由传入的歌单id参数，获取歌单的详情
const getList = async function () {
  let res
  // console.log(route.query.type)
  if (listType == 1) {
    // console.log(listId)
    res = await axios.get('/album?id=' + listId)
    const albumItem = await axios.get('/album/detail/dynamic?id=' + listId)
    console.log(res, albumItem)
    plyLst.listName = res.album.name //歌单名
    plyLst.commentCount = albumItem.commentCount //评论数
    plyLst.shareCount = albumItem.shareCount //分享量
    // plyLst.playCount = albumItem.playCount //播放量
    plyLst.coverImgUrl = res.album.blurPicUrl //歌单图片
    plyLst.subscribedCount = albumItem.subCount //收藏数
    plyLst.songs = res.songs
    // console.log(res)
  } else {
    console.log(222222222)
    res = await axios.get('/playlist/detail?id=' + listId)
    plyLst.listName = res.playlist.name //歌单名
    plyLst.commentCount = res.playlist.commentCount //评论数
    plyLst.shareCount = res.playlist.shareCount //分享量
    plyLst.playCount = res.playlist.playCount //播放量
    plyLst.coverImgUrl = res.playlist.coverImgUrl //歌单图片
    plyLst.subscribedCount = res.playlist.subscribedCount //收藏数
    getSong()
  }
}
// 通过歌单id获取歌单中的全部歌曲
const getSong = async function () {
  const res = await axios.get(
    '/playlist/track/all?id=' + listId + '&limit=20&offset=0'
  )
  // console.log(res)
  plyLst.songs = res.songs
  // console.log(plyLst.songs, res.songs)
}
// 组件挂载之前进行数据请求，数据包括，详细歌单的数据信息、歌单中的全部音乐
onBeforeMount(() => {
  getList()
})
// 通过子组件emit获得需要播放的歌曲在歌单的位置index
// 在点击歌单中歌曲时触发
const getClickIndex = (value) => {
  // console.log(value)
  store.commit('changeplayList', plyLst.songs)
  store.commit('changeplayIndex', value)
}
</script>
<style scoped>
.top-back {
  position: relative;
  /* z-index: -1; */
  /* height: 1.875rem; */
  /* background-image: url(); */
  /* overflow: hidden; */
}
.top-img {
  position: absolute;
  top: -5rem;

  width: 100%;
  z-index: -99;
  /* height: 20px; */
  overflow: hidden;
}
.top-img img {
  transform: scale(1.8);
  height: 30rem;
  filter: blur(1.5rem) brightness(70%);
}
.mid {
  margin-top: 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(237, 237, 237);
}
.mid-leftb {
  display: flex;
  justify-content: center;
  width: 50%;
  height: 8.125rem;
}
.mid-leftb img {
  height: 100%;
}
.mid-rightb {
  width: 50%;
}
.bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 1.2rem;
  /* height: ; */
  /* font-size: 20px; */
  color: rgb(237, 237, 237);
}
.bottom {
  font-size: 0.5rem;
}
.iconfont {
  font-size: 1.8rem;
}
.bottom div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.song-list {
  margin-top: 1.2rem;
  border-radius: 1rem 1rem 0 0;
  background-color: rgb(255, 255, 255);
  /* background-attachment: fixed; */
}
.list-top {
  position: sticky;
  top: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  /* background-color: pink; */
}

.list-licon {
  position: absolute;
  /* left: 0.8rem; */
  width: 70%;
  font-size: 1.2rem;
}
.list-licon-icon {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0.3rem;
  height: 2.5rem;
  width: 2rem;
  font-size: 1rem;
}
.list-licon-play {
  position: absolute;
  height: 2.5rem;
  width: 70%;
  left: 2.8rem;
  font-size: 1rem;
}
.list-licon-play .play {
  font-size: 1rem;
  /* margin-left: 0.8rem; */
}
.list-licon-play .word {
  color: rgb(150, 150, 150);
  font-size: 0.8rem;
}
.list-ricon {
  display: block;
  position: absolute;
  top: 50%;
  margin: -1rem 0;
  right: 0.3rem;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem;
  /* margin: 0.2rem; */
  /* padding: 0.2rem; */
  /* margin: 0.05rem 0; */
  background-color: #333;
  color: #f3d19e;
  font-size: 0.5rem;
  border-radius: 1rem;
}
.list-ricon .van-icon {
  padding: 0 0.3rem;
}
.list-sub {
  height: 2.5rem;
}
.load_icon {
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
