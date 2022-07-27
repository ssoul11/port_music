import { localSet } from '@/utils/token'
import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    // 通过vuex保存播放列表内容，作为公共组件
    playList: [{
      // al表示歌曲的封面
      al: {
        id: 137142551,
        name: "孤勇者",
        pic: 109951166702962260,
        picUrl: "https://p1.music.126.net/aG5zqxkBRfLiV7A8W0iwgA==/109951166702962263.jpg",
        pic_str: "109951166702962263"
      },
      ar: [{
        id: 2116,
        name: "陈奕迅"
      }]
      ,
      // 歌曲的名字
      name: "孤勇者",
      // id表示歌曲的id
      id: 1901371647,
    }],
    // 歌曲在歌单中的顺序
    playIndex: 0,
    // 播放状态
    playStatus: false,
    // 播放详细页面是否弹出
    showPlayer: false,
    // 当前播放音乐歌词，歌词对象中包含了n个数组，每个数组保存了一个对象，包含了每句当前播放到的时间单位/秒，以及每句歌词
    playLyric: [],
    // 当前音乐播放时间
    curplayTime: 0,
    // 当前音乐最大播放时间
    maxplayTime: 0,
    // 用来判断是否循环播放 0--顺序播放  1--随机播放  2--单曲循环
    playMode: 0,
    // 用来判断是否登录
    hasToken: false,
    // 登录用户的详细
    userProfile: {}

  },
  getters: {
  },
  mutations: {
    // 播放状态改变方法
    changeStatus(state, newValue) {
      // console.log("调用了vuex的changeStatus方法");
      // console.log(state, newValue);
      state.playStatus = newValue
    },
    // 播放列表改变
    changeplayList(state, newList) {
      state.playList = newList
      // console.log(state.playList);
      // this.state.playList = value
      // console.log(playList, newList);
      // console.log("调用了", value);
    },
    // 在歌单中播放歌曲的index改变
    changeplayIndex(state, newIndex) {
      state.playIndex = newIndex
      // console.log(playIndex, value);
      // console.log(playIndex);
    },
    // 播放详细页面弹出状态改变
    changeshowPlayer(state) {
      // console.log(state.showPlayer);
      state.showPlayer = !state.showPlayer
    },
    // 当前歌曲歌词更新方法
    changeplayLyric(state, val) {
      state.playLyric = val
    },
    // 当前歌曲播放时间更新方法
    changecurplayTime(state, val) {
      // console.log("changecurplayTime执行了");
      state.curplayTime = val
    },
    // 更新歌曲最大时间的方法，audio更新-->vuex更新
    changemaxplayTime(state, val) {
      state.maxplayTime = val
    },
    // 删除歌单中某一首歌的方法
    deleteOneMusic(state, index) {
      state.playList.splice(index, 1)
      if (state.playIndex > index) {
        state.playIndex = state.playIndex - 1
      }
      // delete state.playList[index]
    },
    // 这个用来表示用户是否登录，但是用处不多
    changehasToken(state, val) {
      state.hasToken = val
    },
    // 用户的信息保存更新方法
    changeuserProfile(state, val) {
      state.userProfile = val
    }
  },
  actions: {
    // 异步根据歌曲id请求歌词
    async getplayLyric({ state, commit }) {
      // console.log("getplayLyric调用了");
      const res = await axios.get(`/lyric?id=${state.playList[state.playIndex].id}`)
      console.log(res);

      // 解析获取到的歌词
      const arr = res.lrc.lyric.trim().split('\n').map((value) => {
        const curTime = value.slice(value.indexOf('[') + 1, value.indexOf(']')).split(':').reduce((total, val) => {
          return parseFloat(total) * 60 + parseFloat(val)
        }, 0)

        const str = value.slice(value.indexOf(']') + 1)
        // console.log(curTime, str);
        return { curTime, str, nxTime: Infinity }
      })
      // 返回的数据包含了当前句时间，当前句歌词，下一句歌词开始时间
      for (let i = 0; i < arr.length - 1; i++) {
        arr[i].nxTime = arr[i + 1].curTime
      }
      commit('changeplayLyric', arr)
    },

    // 这是第一次登录，登陆后将token保存
    async getloginToken({ commit }, obj) {
      const res = await axios.get(
        `/login/cellphone?phone=${obj.username.value}&password=${obj.password.value}`
      )
      console.log(res);
      commit('changeuserProfile', res.profile)
      // localSet(res.account.id, res.profile)
      localSet('token', res.profile)
      commit('changehasToken', true)
    },

    async getLogout({ commit }) {
      const res = await axios.get('/logout')
      console.log(res);
      commit('changeuserProfile', {})
      // localSet(res.account.id, res.profile)
      localSet('token', {})
      commit('changehasToken', false)
    }

  },
  modules: {
  }
})
