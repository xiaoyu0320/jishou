import { get } from './server'
// 动态通知
export function newsList (obj) {
  return get('news/lists', obj)
}
// 动态通知详情
export function newsDetail (obj) {
  return get('news/detail', obj)
}
// 开奖通知
export function drawLists (obj) {
  return get('news/drawLists', obj)
}
