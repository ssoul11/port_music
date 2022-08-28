// 详细播放页面组件
<template>
  <!-- 播放详细页面的背景图片 -->
  <div class="bgpic">
    <img :src="song.al.picUrl" alt="" />
  </div>

  <!-- 播放详细页面的头部 -->
  <div class="top">
    <div class="top-left">
      <span
        class="iconfont icon-direction-left"
        @click="changeshowPlayer"
      ></span>
      <span class="detailedMusic"
        ><span class="songName">{{ song.name }}</span>
        <span class="singerName" @click="clickSinger">
          <span
            ><span v-for="(singer, i) in song.ar" :key="singer"
              ><span v-if="i > 0">/</span>{{ singer.name }}</span
            ></span
          >
          <span><van-icon on name="arrow" size="0.5rem" color="white" /></span>
        </span>
      </span>
    </div>

    <div class="top-right">
      <span class="iconfont icon-icon-test1"></span>
    </div>
  </div>

  <!-- 页面的唱片以及针 -->
  <div v-show="!states.word_page" class="disc-needle" @click="changeword_page">
    <img
      class="needle"
      :class="{ needle_act: playStatus }"
      src="@/assets/needle-ab.png"
      alt=""
    />
    <div class="disc-pic">
      <img
        class="picUrl"
        :class="{ rotate_run: playStatus, rotate_pause: !playStatus }"
        :src="song.al.picUrl"
        alt=""
      />
      <img class="disc" src="@/assets/disc.png" alt="" />
    </div>
  </div>

  <!-- 歌词部分 -->
  <div
    v-show="states.word_page"
    class="disc-word"
    ref="big_div4word"
    @click="changeword_page"
  >
    <div class="song-word" ref="div4word">
      <p
        v-for="(item, i) in playLyric"
        :key="item"
        :words_id="i"
        :class="{
          stress: item.curTime <= curplayTime && curplayTime < item.nxTime
        }"
      >
        {{ item.str }}
      </p>
    </div>
  </div>
  <!-- <button @click="updateTime">点击切换时长</button> -->

  <!-- 中间部分的图标按钮 -->
  <div class="mid-icon" v-show="!states.word_page">
    <span>
      <van-icon name="like-o" />
    </span>
    <span class="iconfont icon-xiazai"></span>
    <span class="iconfont icon-jianyi"></span>
    <span class="iconfont icon-gengduo"></span>
  </div>

  <!-- 进度条 -->
  <div class="song-progress">
    <span>{{ formatDate(curplayTime) }}</span>
    <input type="range" min="0" :max="maxDuration" v-model="theCurTime" />
    <span>{{ formatDate(maxDuration) }}</span>
  </div>

  <!-- 下方播放按钮 -->
  <div class="bottom-icon">
    <div class="button-play">
      <div class="button-line"></div>
      <div class="button-detail-play">
        <span class="iconfont icon-24gl-repeat2"></span>
        <span class="iconfont icon-shangyishoushangyige" @click="preOne"></span>
        <span
          v-if="playStatus"
          class="iconfont icon-zanting big-zanting"
          @click="changePlay(false)"
        ></span>
        <span
          v-else
          class="iconfont icon-bofang big-bofang"
          @click="changePlay(true)"
        ></span>
        <span class="iconfont icon-xiayigexiayishou" @click="nextOne"></span>
        <span class="iconfont icon-24gf-playlist" @click="showPopup"></span>
      </div>
    </div>
  </div>
  <!-- 播放列表展示 -->
  <van-popup
    class="my-van-popup"
    v-model:show="states.showPlayList"
    round
    position="bottom"
    style="
      height: 60%;
      width: 80%;
      left: 5%;
      border-radius: 1rem;
      bottom: 5%;
      padding: 1rem;
    "
  >
    <div class="wrapper">
      <div>
        当前播放<span>({{ playList.length }})</span>
      </div>
      <div class="list-icon"><span>随机播放</span><span>收藏全部</span></div>
    </div>
    <div class="list-songs-all">
      <div class="list-song" v-for="(item, index) in playList" :key="item">
        <div
          class="one-left"
          :class="{ one_stress: index === playIndex }"
          @click="changeplayIndex(index)"
        >
          <span>{{ item.name }}</span>
          <span class="one-name" v-for="(one, i) in item.ar" :key="one">
            <span v-if="i > 0">/</span>-{{ one.name }}</span
          >
        </div>
        <span class="one-right"
          ><van-icon name="cross" @click="delete_one(index)"
        /></span>
      </div>
    </div>
  </van-popup>

  <!-- 当歌曲包含多个歌手时，弹出遮罩层供用户选择要查看的歌手 -->
  <van-overlay :show="states.changeSinger" @click="states.changeSinger = false">
    <div class="singer_wrp">
      <div class="singer_block">
        <div
          v-for="singer in song.ar"
          :key="singer"
          @click="clickMulti(singer)"
        >
          {{ singer.name }}
        </div>
      </div>
    </div>
  </van-overlay>
</template>
<script>
import { reactive } from '@vue/reactivity'
import { mapMutations } from 'vuex'
import { Toast } from 'vant'

export default {
  setup() {
    const states = reactive({
      word_id: 0, // 当前播放句歌词在整个歌词文件的索引
      word_page: false, // 用来判断是否显示歌词页面
      showPlayList: false, // 用来判断是否展示播放列表
      changeSinger: false
    })
    // 用来改变播放列表是否展示的状态
    const showPopup = () => {
      states.showPlayList = true
    }

    return {
      showPopup,
      states
    }
  },

  props: [
    'song',
    'playStatus',
    'changePlay',
    'playLyric',
    'curplayTime',
    'playIndex',
    'playList',
    'maxDuration'
  ],
  emits: ['updatecurTime'],
  methods: {
    ...mapMutations([
      'changeshowPlayer',
      'changeplayIndex',
      'changecurplayTime',
      'changemaxplayTime',
      'deleteOneMusic'
    ]),
    // 用来修改是否展示歌词还是唱片页面的方法
    changeword_page() {
      this.states.word_page = !this.states.word_page
    },
    // 上一首
    preOne() {
      if (this.playIndex === 0) {
        this.changeplayIndex(this.playList.length - 1)
      } else {
        this.changeplayIndex(this.playIndex - 1)
      }
    },
    // 下一首
    nextOne() {
      if (this.playIndex === this.playList.length - 1) {
        this.changeplayIndex(0)
      } else {
        this.changeplayIndex(this.playIndex + 1)
      }
    },

    // 该函数传入的数据为响应式数据，所以当传入的数据发生改变，函数会再次调用
    // 格式化时间
    formatDate(val) {
      // console.log('formatDate函数触发了')
      let hour = Math.floor(val / 60 / 60)
      let min = Math.floor(val / 60 - hour * 60)
      if (min < 10) min = '0' + min
      let sec = Math.floor(val - hour * 60 * 60 - min * 60)
      if (sec < 10) sec = '0' + sec
      return hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`
    },
    // 用来删除列表中某一首歌的方法
    delete_one(index) {
      // console.log(Toast)
      if (this.playList.length <= 1) {
        Toast({
          message:
            '<div style="height: 4rem;width: 12rem;display: flex;color: white;background-color: rgba(80,80,80);flex-direction: column;align-items: center;justify-content:space-around"><span class="iconfont icon-gantanhao" style="font-size:1.5rem"></span><span>就剩一首了，咱别删了</span></div>',
          iconSize: '10rem',
          type: 'html',
          duration: 2000
        })
        return
      }
      this.deleteOneMusic(index)
    },
    // 点击歌手进入歌手主页
    clickSinger() {
      console.log('点击歌手')
      if (this.song.ar.length > 1) {
        console.log('多个歌手')
        this.states.changeSinger = true
      } else {
        this.$router.push(`/singer/${this.song.ar[0].id}`)
        this.changeshowPlayer()
      }
      // this.$router.push(`/singer/${}`)
    },
    // 当包含多个歌手时，点击的某一位歌手
    clickMulti(singer) {
      this.$router.push(`/singer/${singer.id}`)
      this.changeshowPlayer()
    }
  },
  mounted() {
    // console.log('this.song调用mounted')
    // console.log(this.maxDuration)
  },

  updated() {
    // console.log(this.playLyric)
    // console.log(this.$refs)
  },
  computed: {
    theCurTime: {
      get: function () {
        return this.curplayTime
      },
      set: function (newV) {
        this.$emit('updatecurTime', newV)
      }
    }
  },
  watch: {
    curplayTime() {
      // 获取当前class为stress的dom元素
      let curP = document.querySelector('.stress')
      // 根据播放时间将外部盒子利用transform盒子整体向上移动达到效果，根据当前stress的元素，获得元素高度，再根据盒子的次序进行相乘获得偏移量
      // if (curP) {
      //   this.$refs.div4word.style.transform = `translateY(-${
      //     curP.clientHeight * curP.attributes[0].value - 160
      //   }px)`
      //   console.log(this.$refs.big_div4word.scrollTop)
      // }
      if (curP) {
        if (curP.offsetTop - this.$refs.big_div4word.scrollTop > 200) {
          this.$refs.big_div4word.scrollTop = curP.offsetTop - 180
        }
      }
    }
  }
}
</script>
<style scoped>
.bgpic {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -99;
  overflow: hidden;
}
.bgpic img {
  width: 100%;
  height: 100%;
  /* background-size: ; */
  transform: scale(1.8);
  filter: blur(30px) brightness(50%);
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 2.5rem;
  color: white;
}
.top-left {
  /* position: relative; */
  display: flex;
  align-items: center;
  width: 80%;
  height: 100%;
  /* background-color: pink; */
}
.top-left .icon-direction-left {
  font-size: 1.5rem;
}
.top-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* width: 50%; */
  height: 100%;
  /* background-color: rgb(219, 219, 219); */
}
.top-right .icon-icon-test1 {
  font-size: 1.5rem;
}
.detailedMusic {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}
.detailedMusic .songName {
  font-size: 1rem;
}
.detailedMusic .singerName {
  font-size: 0.5rem;
}
.disc-needle {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  height: 65%;
}

.disc-needle .needle {
  position: absolute;
  width: 25%;
  left: 45%;
  transform: rotate(-30deg);
  transform-origin: 15% 9%;
  transition: all 0.5s;
}
.disc-needle .needle_act {
  transform: rotate(-4deg);
  /* animation: needle_rota 5s ease; */
  /* transform-origin: 15% 9%; */
  /* transition: all 2s; */
}

.disc-needle .disc-pic {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.pic_rotate {
  animation: img_rotate 20s linear infinite;
}

.disc-needle .picUrl {
  width: 50%;
  position: absolute;
  top: 7.2rem;
  border-radius: 50%;
  z-index: -2;
  animation: img_rotate 20s linear infinite;
}
.disc-needle .disc-pic .rotate_run {
  animation-play-state: running;
}
.disc-needle .disc-pic .rotate_pause {
  animation-play-state: paused;
}

.disc-needle .disc {
  width: 80%;
  position: absolute;
  top: 4rem;
  z-index: -1;
}
.disc-word {
  width: 100%;
  height: 70%;
  margin-top: 1.5rem;
  overflow: scroll;
  color: rgb(205, 205, 205);
  font-size: 0.8rem;
  /* transition: all 5s ease-out; */
  scroll-behavior: smooth;
}
.disc-word .song-word {
  display: flex;
  /* position: relative; */
  height: 100%;
  flex-direction: column;
  align-items: center;
  /* transform: translateY(10%); */
  transition: all 0.5s ease-out;
}
.disc-word .song-word p {
  margin: 0;
  height: 2.5rem;
  line-height: 2.5rem;
}

.disc-word .song-word .stress {
  font-size: 1rem;
  color: white;
}

.mid-icon {
  height: 10%;
  padding: 0 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* background-color: pink; */
  color: white;
}
.mid-icon span {
  font-size: 1.5rem;
}

.song-progress {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 11%;
}
.song-progress input {
  -webkit-appearance: none;
  /* 清除系统默认样式  */
  height: 0.1rem;
  width: 80%;
}
.song-progress input::-webkit-slider-thumb {
  -webkit-appearance: none;
  /*清除系统默认样式*/
  height: 16px; /*拖动块高度*/
  width: 16px; /*拖动块宽度*/
  background: #f8f9fa; /*拖动块背景*/
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 1px #ddd; /*设置边框*/
}

.song-progress span {
  font-size: 0.5rem;
  color: gray;
}

.bottom-icon {
  width: 100%;
  position: fixed;
  bottom: 2%;
}
.button-play {
  /* margin-top: 1rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 10%; */
  /* background-color: greenyellow; */
  color: white;
}
.button-play .button-detail-play {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.button-play .button-detail-play span {
  font-size: 1.5rem;
}
.button-play .button-detail-play .big-bofang {
  transform: scale(1.2);
  font-size: 2.5rem;
}
.button-play .button-detail-play .big-zanting {
  font-size: 2.5rem;
}
.wrapper span {
  font-size: 0.8rem;
  color: rgb(150, 150, 150);
}
.list-songs-all .list-song {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
}
.list-songs-all .list-song .one-left {
  width: 80%;

  /*强制文本在一行内显示*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-songs-all .list-song .one-right {
  /* width: 80%; */
  display: flex;
  align-items: center;
  color: rgb(150, 150, 150);
}

.list-songs-all .list-song .one-left .one-name {
  font-size: 0.5rem;
  color: rgb(150, 150, 150);
}
.list-songs-all .list-song .one_stress,
.list-songs-all .list-song .one_stress .one-name {
  color: red;
}

@keyframes img_rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes font_stress {
  0% {
    /* transform: rotate(0deg); */
  }
  100% {
    scrolltop: offsetTop-200;
  }
}
.singer_wrp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.singer_block {
  width: 7.5rem;
  height: 7.5rem;
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;
  font-size: 1rem;
  text-align: center;
}
.singer_block div {
  margin-top: 1rem;
  color: #333;
}
</style>
