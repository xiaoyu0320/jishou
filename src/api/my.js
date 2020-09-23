import { get } from './server'
// 注册子账号
export function postChildren (obj) {
  return get('user/postChildren', obj)
}
// 更改绑定手机号
export function editMobile (obj) {
  return get('security/editMobile', obj)
}
// 修改资金密码
export function editPayPwd (obj) {
  return get('security/editPayPwd', obj)
}
// 修改登录密码
export function editPwd (obj) {
  return get('security/editPwd', obj)
}
// 头像上传
export function editAvatar (obj) {
  return get('setting/editAvatar', obj)
}
// 修改昵称
export function editNickname (obj) {
  return get('setting/editNickname', obj)
}
// 子账号列表
export function childrenList (obj) {
  return get('user/childrenList', obj)
}
// 父账号向子账号转币
export function transferMoney (obj) {
  return get('user/transferMoney', obj)
}
// 父账号向子账号收币
export function collectMoney (obj) {
  return get('user/collectMoney', obj)
}
// 我的baas码
export function baasInfo (obj) {
  return get('my_draw/info', obj)
}
// 兑换记录
export function exchangeLog (obj) {
  return get('my_draw/exchangeLog', obj)
}
// 兑换提交
export function exchangePost (obj) {
  return get('my_draw/exchangePost', obj)
}
// 兑换
export function exchange (obj) {
  return get('my_draw/exchange', obj)
}
// 选择兑换账号
export function exchangeUser (obj) {
  return get('my_draw/exchangeUser', obj)
}
// 中奖列表
export function drawList (obj) {
  return get('my_draw/list', obj)
}
// 中奖详情列表
export function drawListDetails (obj) {
  return get('my_draw/drawList', obj)
}
// 我的社区
export function community (obj) {
  return get('user/community', obj)
}
// 我的社区（下面列表）
export function communityList (obj) {
  return get('user/communityList', obj)
}
// 社区收益
export function profit (obj) {
  return get('user/profit', obj)
}
// 忘记密码
export function forgetPwd (obj) {
  return get('security/forgetPwd', obj)
}
// 删除子账号
export function childDel (obj) {
  return get('user/del', obj)
}
