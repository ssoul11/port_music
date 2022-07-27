import store from '@/store'
import axios from '@/utils/axios'
import { localGet, localSet } from '@/utils/token'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { // 主页
    path: '',
    name: 'Index',
    component: () => import('../views/IndexHome.vue'),
    beforeEnter: (to, from, next) => {
      // ...
      let user = localGet('token')
      if (!store.hasToken) {
        if (user !== null && Object.keys(user).length !== 0) {
          store.commit('changeuserProfile', user)
          store.commit('changehasToken', true)
        } else {
          axios.get('/login/status').then((res) => {
            if (res.data.profile != null) {
              localSet('token', res.data.profile)
              store.commit('changeuserProfile', res.data.profile)
              store.commit('changehasToken', true)
            }
            // console.log(res.profile == null);
          })
        }
      }
      next()
    }
  },
  { // 主页发现
    path: '/index',
    name: 'IndexHome',
    redirect: '/',
    component: () => import('../views/IndexHome.vue'),

  },
  { // 进入歌单的路由，这里通过动态路由传入id
    path: '/itemMusic/:id',
    name: 'Itemmusic',
    component: () => import('@/views/ItemMusic.vue')
    // path: '/about',
    // name: 'about',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }, {
    // 历史记录及搜索组件路由
    path: '/search',
    name: 'Search',
    component: () => import('@/views/SearchMusic.vue')
  },
  { // 用户主页组件路由
    path: '/user',
    name: 'User',
    component: () => import('@/views/UserIndex.vue')

  },
  { // 每日推荐组件路由
    path: '/recmdmusic',
    name: 'Recmdmusic',
    component: () => import('@/views/RecmdMc')

  },
  { // 私人fm组件路由
    path: '/privfm',
    name: 'Privatefm',
    component: () => import('@/components/home/privFM/PrivateFM')

  },
  { // 歌单广场组件路由
    path: '/groundlist',
    name: 'Groundlist',
    component: () => import('@/views/GroundList.vue')

  },
  { // 排行榜组件路由
    path: '/toplist',
    name: 'Toplist',
    component: () => import('@/views/TopList.vue')

  },
  { // 歌手主页组件路由
    path: '/singer/:id',
    name: 'Singer',
    component: () => import('@/views/SingerIndex')

  },
  { // mv播放组件路由
    path: '/mv/:id',
    name: 'MV',
    component: () => import('@/views/ItemMv')

  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log('路由守卫');
//   next()
// })
export default router
