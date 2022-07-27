// 页面底部播放栏组件
<template>
  <div class="player">
    <!-- 左边图片以及歌曲名等 -->
    <div class="left" @click="showPlayerAct">
      <img :src="playList[playIndex].al.picUrl" />
      <div>
        <p>{{ playList[playIndex].name }}</p>
        <!-- <span>横滑切换上下首哦</span> -->
        <span
          ><span v-for="(singer, i) in playList[playIndex].ar" :key="singer"
            ><span v-if="i > 0">/</span>{{ singer.name }}</span
          >
        </span>
      </div>
    </div>
    <!-- 右边为播放暂停播放列表等按钮 -->
    <div class="right">
      <div class="right-vant">
        <van-icon
          v-if="playStatus"
          name="pause-circle-o"
          @click="changePlay(false)"
        />
        <van-icon v-else name="play-circle-o" @click="changePlay(true)" />
      </div>
      <div class="list-icon">
        <span class="iconfont icon-24gf-playlist" @click="showPopup"></span>
      </div>
      <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3`"
        @ended="endMc"
        @durationchange="maxdurationChange"
      ></audio>
    </div>

    <!-- 播放列表的弹出框 -->
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
        <div
          class="list-song"
          v-for="(item, index) in playList"
          :key="item"
          @click="changeplayIndex(index)"
        >
          <div class="one-left" :class="{ one_stress: index === playIndex }">
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
  </div>

  <!-- 播放界面详细页面的弹出框 -->
  <van-popup
    v-model:show="showPlayer"
    position="bottom"
    :style="{ height: '100%', width: '100%' }"
  >
    <detailedPlayer
      :song="playList[playIndex]"
      :playStatus="playStatus"
      :changePlay="changePlay"
      :playLyric="playLyric"
      :curplayTime="curplayTime"
      :playIndex="playIndex"
      :playList="playList"
      :maxDuration="maxplayTime"
      @updatecurTime="updatecurTime4Father"
    />
  </van-popup>
</template>
<script >
import { reactive } from 'vue'
import { Toast } from 'vant'

// import detailedPlayer from '@/components/detailedPlayer.vue'
// import { reactive } from '@vue/reactivity'
// const { computed } = require('@vue/runtime-core')
// // 这样拿不到
// import { computed } from 'vue'
const { mapState, mapMutations, mapActions } = require('vuex')
// const { ply, plyid } = computed(() => mapState(['playList', 'playIndex']))
// console.log(ply, plyid)
export default {
  setup() {
    const states = reactive({
      showPlayList: false
    })
    const showPopup = () => {
      states.showPlayList = true
    }
    // console.log(this) undefined
    return {
      states,
      showPopup
    }
  },
  mounted() {
    // console.log(this.$refs)
    // console.log(this.audio)
  },
  updated() {
    // Toast.fail('就剩一首了，咱别删了')
    // console.log('this.$ref', this.$refs.audio.duration)
    // console.log('this.getaudioDuration', this.getaudioDuration)
  },
  computed: {
    ...mapState([
      'playList',
      'playIndex',
      'playStatus',
      'showPlayer',
      'playLyric',
      'curplayTime',
      'maxplayTime',
      'playMode'
    ])
  },
  methods: {
    ...mapMutations([
      'changeStatus',
      'changeshowPlayer',
      'changecurplayTime',
      'changemaxplayTime',
      'changeplayIndex',
      'deleteOneMusic'
    ]),
    ...mapActions(['getplayLyric']),

    // 改变音乐播放状态的方法，状态连接：播放按钮-->vuex中的状态-->根据改变后的状态判断audio是否播放
    changePlay(value) {
      this.changeStatus(value)
      if (this.playStatus) {
        this.$refs.audio.play()
        // this.$refs.audio.ontimeupdate = function () {
        //   console.log(this.currentTime)
        // }
        // console.log(this.$refs)
      } else {
        this.$refs.audio.pause()
      }
    },
    // 改变弹出框的状态
    showPlayerAct() {
      // 点击改变弹出界面状态
      this.changeshowPlayer()
      // 点击进去歌词详细页面弹出框，此时进行歌词的获取
      this.getplayLyric()

      // this.changemaxplayTime(this.$refs.audio.duration)
    },
    // 通过子组件修改input的当前的时间emit给父组件来修改audio属性的curtime
    updatecurTime4Father(val) {
      this.$refs.audio.currentTime = val
    },
    // 删除播放列表中的某一首歌的方法，传入索引index
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
    // 当audio一首歌播放结束时进行触发
    endMc() {
      if (this.playMode === 0) {
        if (this.playIndex === this.playList.length - 1) {
          this.changeplayIndex(0)
        } else {
          this.changeplayIndex(this.playIndex + 1)
        }
      } else if (this.playMode === 2) {
        this.$refs.audio.loop = 'loop'
      }
    },
    // 当audio的duration属性发生变化时触发，来对vuex数据继续修改从而对界面数据进行更新
    maxdurationChange(e) {
      this.changemaxplayTime(e.target.duration)
      // console.log('duration改变', val)
    }
  },
  watch: {
    // 当点击歌单中其他音乐时（当前播放歌曲在歌单中的index发生改变），autoplay-->vuex状态改变-->播放组件图标改变
    playIndex() {
      // if (this.playStatus) {
      //   this.$refs.audio.play()
      // } else {
      //   this.$refs.audio.pause()
      // }
      // console.log('index发生改变')
      this.$refs.audio.autoplay = true
      this.changeStatus(true)
      // 当歌曲的index发生改变，此时也进行歌词的获取
      this.getplayLyric()
      this.changeStatus(false)
      this.changeStatus(true)
      console.log('切歌了', this.$refs, this.$refs.audio.duration)
      // 当歌曲的index发生改变，歌曲的最大时长也要发生改变
      // this.changemaxplayTime(this.$refs.audio.duration)
    },
    // 播放列表发生改变时（防止只监听playIndex导致点击其他歌单中的第一首歌不进行状态改变，因为id并没有变）
    playList() {
      this.$refs.audio.autoplay = true
      this.changeStatus(true)
      // // 点击进去歌词详细页面弹出框，此时进行歌词的获取
      // this.getplayLyric()

      // 当歌曲播放列表发生改变，歌曲的最大时长也要发生改变
      // this.changemaxplayTime(this.$refs.audio.duration)
    },

    // （监听播放状态）当播放状态为true时，代表此时歌曲正在播放，则此时开始计时
    playStatus(newV) {
      if (newV) {
        // 保存组件的this指向，此时的this代表组件
        let that = this
        // console.log(this)
        this.$refs.audio.ontimeupdate = function () {
          // 此时的this指向函数的调用，也就是audio实例对象
          that.changecurplayTime(this.currentTime)
          // console.log(this.currentTime)
        }
      }
    }
  }
}
</script>
<style scoped>
.player {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  border-top: 0.05rem solid rgb(112, 112, 112);
  /* pading-left: 0.5rem; */
  background-color: white;
}
.left {
  display: flex;
  /* justify-content: center; */
  padding-left: 0.5rem;
  align-items: center;
  /* background-color: greenyellow; */
  float: left;
  width: 70%;
  height: 100%;
  /*强制文本在一行内显示*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left img {
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
}
.left p {
  margin: 0;
  font-size: 0.85rem;
}
.left div span {
  font-size: 0.5rem;
}
.right {
  display: flex;
  align-items: center;
  float: right;
  /* background-color: pink; */
  /* width: 50%; */
  height: 100%;
  padding-right: 0.5rem;
}
.right div {
  font-size: 1.5rem;
}
/* .right span {
  font-size: 2.2rem;
} */
.right .right-vant {
  padding-right: 0.5rem;
}
.right .list-icon span {
  font-size: 1.5rem;
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
</style>
