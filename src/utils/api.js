import axios from '@/utils/axios'
// 包含所有请求方法
// 请求轮播图数据
export function getBanners() {
    return axios.get('/banner?type=2')
}
// 获取推荐歌单数据
export function getPersonlizs() {
    return axios.get('/personalized?limit=6')
}
