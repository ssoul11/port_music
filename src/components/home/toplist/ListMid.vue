<template>
  <div v-if="states.list1.length < 4" class="load_icon">
    <van-loading type="spinner" size="5rem" color="#333" />
  </div>
  <div v-else>
    <div class="list_top">
      <div>官方榜</div>
      <div v-for="item in states.list1" :key="item">
        <router-link :to="'/itemmusic/' + item.id" class="list_item">
          <div class="pic_left"><img :src="item.coverImgUrl" alt="" /></div>
          <div class="pic_right">
            <p v-for="(song, index) in item.tracks" :key="song">
              {{ index + 1 + '.' + song.first + ' - ' + song.second }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
    <div style="margin: 0 1rem">其他榜单</div>
    <div class="list_main">
      <div v-for="item in states.list2" :key="item" class="item_list">
        <router-link :to="'/itemmusic/' + item.id">
          <img :src="item.coverImgUrl" alt="" /><span>{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
const { default: axios } = require('@/utils/axios')
const { onMounted, reactive } = require('@vue/runtime-core')
const states = reactive({
  list1: [],
  list2: []
})
// async function getToplist() {
//   const res = await axios.get('/toplist')
//   states.list2 = res.list
//   states.list1 = states.list2.splice(0, 4)
//   console.log(states.list1, states.list2)
// }
// 异步获取排行榜歌单
async function getToplistDetail() {
  const res = await axios.get('/toplist/detail')
  states.list2 = res.list
  states.list1 = states.list2.splice(0, 4)
  console.log(states.list1, states.list2)
}
onMounted(() => {
  //   getToplist(),
  getToplistDetail()
})
</script>
<style scoped>
.list_top {
  margin: 0 1rem;
}
.list_item {
  color: rgb(122, 122, 122);

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
}
.pic_left {
  min-width: 5.5rem;
  width: 5.5rem;
  height: 5.5rem;
}

.pic_left img {
  width: 100%;
  border-radius: 0.5rem;
}
.pic_right {
  /* width: 100%; */
  margin-left: 0.5rem;
  overflow: hidden;
}
.pic_right p {
  font-size: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list_main {
  margin: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}
.item_list {
  margin-top: 1rem;
  min-width: 5.5rem;
  width: 5.5rem;
  height: 7rem;
  text-align: center;
}
.item_list img {
  width: 100%;
  border-radius: 0.5rem;
}
.item_list span {
  color: rgb(122, 122, 122);
  font-size: 0.5rem;
}
.load_icon {
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>