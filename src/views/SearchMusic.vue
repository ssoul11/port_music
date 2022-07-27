// 搜索界面以及历史记录组件
<template>
  <div class="top">
    <div class="top-left">
      <span
        class="iconfont icon-direction-left"
        @click="$router.back(-1)"
      ></span>
      <input
        type="text"
        placeholder="陈奕迅"
        v-model="states.searchKey"
        @keyup.enter="searchMc"
        @focus="onFocus"
        @blur="onBlur"
        @click="onFocus"
      />
    </div>
  </div>
  <div v-if="!states.showHistory" class="history">
    <div class="his">历史</div>
    <div class="hisname">
      <span
        v-for="item in states.theKeyList"
        :key="item"
        @click="hisButton(item.name)"
        ><van-tag
          size="medium"
          type="primary"
          round
          color="#333"
          text-color="#f3d19e"
        >
          {{ item.name }}
        </van-tag></span
      >
    </div>
    <div class="delete_his">
      <van-icon name="delete-o" @click="removeAll" />
    </div>
  </div>
  <!-- 复用了渲染歌曲的组件 -->
  <SongList
    class="setZindex"
    v-else
    v-for="(song, index) in states.theKeyList[0].songs"
    :key="song"
    :oneSong="song"
    :index="index"
    @click="onePlay(song)"
  ></SongList>
</template>
<script>
import { reactive } from '@vue/reactivity'
import { localSet, localGet, localRemove } from '@/utils/token'
import { onMounted } from '@vue/runtime-core'
import axios from '@/utils/axios'
import store from '@/store'
// import SongList from '@/components/slist/SongList.vue'
export default {
  setup() {
    const states = reactive({
      searchKey: '', // 目前输入框的值
      theKeyList: [], // 用来保存历史搜索的key，这是一个对象数组，每个对象包含了搜索的key的name和对应歌曲
      showHistory: false // 判断是否展示搜索结果页面
    })
    // 进行搜索后的处理函数
    function searchMc() {
      let i = 0
      if (
        states.theKeyList.some((item, index) => {
          i = index
          return item.name === states.searchKey
        })
      ) {
        let temp = states.theKeyList.splice(i, 1)
        // let temp = states.theKeyList[0]
        states.theKeyList.unshift(...temp)
        localSet('theKeyList', states.theKeyList)
        states.showHistory = true
      } else {
        getMcHis()
      }
    }
    // 获取搜索数据的异步方法
    function getMcHis() {
      axios.get(`/cloudsearch?keywords=${states.searchKey}`).then((res) => {
        // console.log(res)
        // states.keyList.unshift(states.searchKey)
        states.theKeyList.unshift({
          name: states.searchKey,
          songs: res.result.songs
        })
        if (states.theKeyList.length > 5) {
          states.theKeyList.pop()
        }
        localSet('theKeyList', states.theKeyList)
        states.showHistory = true
      })
    }
    // 清除所有历史记录的方法
    function removeAll() {
      localRemove('theKeyList')
      states.theKeyList = []
    }
    onMounted(() => {
      states.theKeyList = localGet('theKeyList')
      if (states.theKeyList == null) {
        states.theKeyList = []
      }
    })
    function onFocus() {
      console.log('聚焦了哦')
      states.showHistory = false
    }
    function onBlur() {
      console.log('失焦了哦')
      // states.showHistory = true
    }
    // 点击按钮进行搜索
    function hisButton(name) {
      states.searchKey = name
      searchMc()
      console.log('点击了button')
    }
    // 点击列表中某一首歌时，加入playList进行播放
    function onePlay(song) {
      console.log(store.state.playList)
      const tempArr = store.state.playList.slice(0)
      tempArr.splice(store.state.playIndex, 0, song)
      // this.changeplayList()
      console.log(tempArr)
      console.log('这首歌在点击', song)
      store.commit('changeplayList', tempArr)
    }
    return { states, searchMc, removeAll, onFocus, onBlur, hisButton, onePlay }
  }
}
</script>

<style scoped>
.top {
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 2.5rem;
  color: rgb(0, 0, 0);
  background-color: white;
}
.top-left {
  /* position: relative; */
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: pink; */
}
.top-left .icon-direction-left {
  font-size: 1.5rem;
  padding-right: 5%;
}
.top-left input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid black;
}
.history {
  position: relative;
  display: flex;
  /* justify-content: space-between; */
  /* align-items: center; */
  padding: 0 1rem;
}
.history .his {
  width: 15%;
}
.history .hisname {
  width: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.history .hisname span {
  margin: 0.1rem;
}
.delete_his {
  font-size: 1rem;
  position: absolute;
  right: 5%;
  /* float: right; */
}
.setZindex {
  /* z-index: -1; */
}
</style>
