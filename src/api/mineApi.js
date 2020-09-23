import { get } from './server'

// 矿机列表
export const mineList = (obj) => {
  return get('Solidmine/getMineList', obj)
}
// 矿机详情
export const mineDetail = (obj) => {
  return get('solidmine/getMineById', obj)
}
// 订单列表
export const orderList = (obj) => {
  return get('Solidorder/getOrder', obj)
}
// 预下单
export const setOrder = (obj) => {
  return get('Solidorder/setOrder', obj)
}
// 支付
export const payOrder = (obj) => {
  return get('Solidorder/payOrder', obj)
}
// 质押
export const lockAsc = (obj) => {
  return get('Solidorder/lockAsc', obj)
}
// usdt换取对应的等值币
export const lockByUsdt = (obj) => {
  return get('Solidorder/getLockByUsdt', obj)
}
// 我的
export const getUserInfo = (obj) => {
  return get('Solidme/getUserInfo', obj)
}
// 我的矿机
export const myMine = (obj) => {
  return get('Solidorder/myMine', obj)
}
// 获取质押/提取规则
export const getLockRule = (obj) => {
  return get('Solidme/getLockRule', obj)
}
// 获取质押/提取明细
export const getLockDetail = (obj) => {
  return get('Solidme/getLockDetail', obj)
}
// 我的质押
export const golockAsc = (obj) => {
  return get('Solidme/lockAsc', obj)
}
// 提取
export const drawAsc = (obj) => {
  return get('Solidme/drawAsc', obj)
}
// 获取售后订单列表
export const getRefund = (obj) => {
  return get('Solidorder/getRefund', obj)
}
// 我的收益明细
export const ascProfit = (obj) => {
  return get('Solidme/ascProfit', obj)
}
// 判断小艾可申请退款数量金额
export const getRefundMoney = (obj) => {
  return get('Solidorder/getRefundMoney', obj)
}
// 小艾矿机申请退款
export const applyRefund = (obj) => {
  return get('Solidorder/applyRefund', obj)
}
// 我的社区
export const getTeam = (obj) => {
  return get('Solidme/getTeam', obj)
}
// 获取我的质押提取手续费
export const getDrawFee = (obj) => {
  return get('Solidme/getDrawFee', obj)
}
// 我的收益明细统计
export const getProfitSum = (obj) => {
  return get('Solidme/getProfitSum', obj)
}
