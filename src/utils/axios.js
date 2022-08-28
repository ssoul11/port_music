import axios from 'axios'
import { Toast } from 'vant'
// import router from '@/router/index'
// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
// axios.defaults.baseURL = 'https://coder4music-api.vercel.app'
axios.defaults.baseURL = 'https://autumnfish.cn/'
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
// axios.defaults.timeout = 10000
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
    // console.log(res.message);
    // if (typeof res.data !== 'object') {
    //     Toast.fail('服务端异常')
    //     return Promise.reject(res)
    // }
    // if (res.status !== 200) {
    //     Toast.fail('请求错误')
    //     // if (res.data.message) Toast.fail(res.data.message)
    //     // if (res.data.resultCode === 419) {
    //     //     router.push({ path: '/login' })
    //     // }
    //     return Promise.reject(res.data)
    // }
    console.log(res);
    return res.data
    // return res
}, (err) => {
    Toast({
        message:
            `<div style="height: 4rem;width: 15rem;display: flex;font-size:0.8rem;color: white;background-color: rgba(80,80,80);flex-direction: column;align-items: center;justify-content:space-around"><span class="iconfont icon-gantanhao" style="font-size:1rem"></span><span>${err.response.data}</span></div>`,
        iconSize: '10rem',
        type: 'html',
        duration: 2000
    })
    return Promise.reject(err)
})
export default axios
