import {
  get,
  gett
} from './server'

// 登录
export function login (obj) {
  return gett('user/login', obj)
}
// 我的信息
export function getinfobyuid (obj) {
  return get('user/getinfobyuid', obj)
}
// 检查y用户信息
export function checkuserstatus (obj) {
  return get('user/checkuserstatus', obj)
}
// 获取验证码
// export function forget (obj) {
//   return getv3('sms/forget', obj)
// }
// 修改登录密码
export function forgetpassword (obj) {
  return get('user/forgetpassword', obj)
}
// 修改交易密码
export function forgetpaypassword (obj) {
  return get('user/forgetpaypassword', obj)
}
// 实名认证
export function bindId (obj) {
  return get('user/checkId', obj)
}
// 更换绑定手机
export function updatemobile (obj) {
  return get('user/updatemobile', obj)
}
// 获取资产大类
export function getgoldlist (obj) {
  return get('user/getGoldlist', obj)
}
// 获取资产
export function getmygold (obj) {
  return get('user/getMyGold', obj)
}
// 获取行情
export function getmarket (obj) {
  return get('user/getmarket', obj)
}
// 转账
export function asc2asc (obj) {
  return get('user/asc2asc', obj)
}
// 交易记录
export function getlog (obj) {
  return get('user/getlog', obj)
}
// 兑换ETH
export function asc2eth (obj) {
  return get('user/asc2eth', obj)
}
// 获取可用ASC明细
export function getusablelog (obj) {
  return get('user/getusablelog', obj)
}
// 获取兑换ASC
export function ascwithdraw (obj) {
  return get('user/ascwithdraw', obj)
}
export function transfer (obj) {
  return get('asc/transfer', obj)
}

// export function getnodeUrl () {
//   return 'https://mainnet.meet.one'
// }

export function createkey (obj) {
  return get('asc/createkey', obj)
}
export function getcurrency (obj) {
  return get('asc/getcurrency', obj)
}

export function register (obj) {
  return gett('user/register', obj)
}

// 忘记密码
export function getforget (obj) {
  return gett('user/forget', obj)
}

export function sendsms (obj) {
  return gett('user/sendsms', obj)
}
// 国际验证码
export function sendisms (obj) {
  return gett('user/sendisms', obj)
}
// 邀请码
export function getInviteInfo (obj) {
  return get('user/getInviteInfo', obj)
}

export function getNewCurrency (obj) {
  return get('currency/getCurrency', obj)
}
// 支付方案2
export function transferEthtoken (obj) {
  return get('asc/transferEthtoken', obj)
}

// 存储支付节点
export function token2EosAccount (obj) {
  return get('user/token2EosAccount', obj)
}
// 兑换列表
export function Baselog (obj) {
  return get('user/getBaselog', obj)
}
// 手续费
export function getgas (obj) {
  return get('asc/getgas', obj)
}
// 检查是否系统维护中
export function serverStatus (obj) {
  return gett('asc/serverStatus', obj)
}
// 获取配置项
export const getConfig = data => {
  return get('config/getConfig', data)
}

// 兑换艾点
export const asc2icoin = data => {
  return get('transfer/asc2icoin', data)
}
// 获取ASC数量
export const getAscAmount = data => {
  return get('transfer/getAscAmount', data)
}

// 艾点提现
export const icoin2asc = data => {
  return get('transfer/icoin2asc', data)
}
// 邮箱发送验证码
export const sendMailCode = data => {
  return get('user/sendMailCode', data)
}

/**
 ********************************************************************************************************
 * Master Start
 */
// allcoins
// lastest transaction
/**
 ********************************************************************************************************
 * Master End
 */

// 图形验证码
export function getCaptcha (obj) {
  return get('user/getCaptcha', obj)
}

// 正常还是冻结
export function chkFreeze (obj) {
  return get('user/chkFreeze', obj)
}
// 获取平衡币配置
export const getAdConfig = data => {
  return get('config/getAdConfig', data)
}
//   资产信息
export const assetsinfo = data => {
  return get('assets/info', data)
}
//   充值
export const recharge = data => {
  return get('assets/recharge', data)
}
// 闪兑
export const exchange = data => {
  return get('assets/exchange', data)
}
//  闪兑提交
export const exchangePost = data => {
  return get('assets/exchangePost', data)
}
//  闪兑提交
export const assetsdetail = data => {
  return get('assets/detail', data)
}
// 开始报名
export const enrollstart = data => {
  return get('enroll/start', data)
}

// 提交报名
export const enrollpost = data => {
  return get('enroll/post', data)
}
// 报名列表
export const enrolllist = data => {
  return get('enroll/lists', data)
}
// 报名页面
export const enrollindex = data => {
  return get('enroll/index', data)
}
// 提币
export const assetsextract = data => {
  return get('assets/extract', data)
}
// 提币提交
export const extractPost = data => {
  return get('assets/extractPost', data)
}
// 报名规则
export const rule = data => {
  return get('enroll/rule', data)
}
// 报名规则
export const transferPost = data => {
  return get('assets/transferPost', data)
}
// 报名规则
export const getNickname = data => {
  return get('assets/getNickname ', data)
}

// 拼团中传入状态
export const indexStatus = data => {
  return get('enroll/indexStatus', data)
}

// 版本号
export const getVersion = data => {
  return get('user/getVersion', data)
}
// 版本号
export const userList = data => {
  return get('enroll/userList', data)
}
