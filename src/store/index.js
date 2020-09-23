import Vue from 'vue'
import Vuex from 'vuex'
// import native from '@/utils/native'
import {
  getinfobyuid,
  login,
  getAdConfig
} from 'api'
Vue.use(Vuex)
const state = {
  bottomFlag: true,
  info: [],
  foottype: 1,
  unitlist: [],
  userinfo: {},
  unitinfo: {},
  getinfo: {
    mobile: '',
    password: '',
    btcpa: '',
    btcpk: ''
  },
  nickname: '',
  mobile: ''
}
const getters = {
  bottomFlag: state => state.bottomFlag,
  mygoldState: state => state.info,
  foottype: state => state.foottype,
  unit: state => state.unit,
  userinfo: state => state.userinfo,
  nickname: state => state.nickname,
  mobile: state => state.mobile

}
const mutations = {
  setBottomFlag: (state, flag) => {
    state.bottomFlag = flag
  },
  setBottomType: (state, foottype) => {
    state.foottype = foottype
  },
  GET_MYGODE: (state, info) => {
    state.info = info
  },
  GET_UNIT: (state, unitlist) => {
    state.unitlist = unitlist
    let obj = {}
    unitlist.forEach(data => {
      obj[data.key] = data.value
    })
    state.unitinfo = obj
  },
  SET_NICKNAME: (state, name) => {
    state.userinfo.nickname = name
  },
  SET_CHANGEIMG: (state, url) => {
    state.userinfo.avatar.small_pic = url
  },
  SET_INFO: (state, userinfo) => {
    state.userinfo = userinfo
    state.nickname = userinfo.nickname
    state.mobile = userinfo.mobile
  }
}
const actions = {
  gologin ({
    commit, dispatch
  }, getinfo) {
    // const {
    //   account,
    //   password,
    //   btcpa,
    //   btcpk
    // } = getinfo
    return new Promise((resolve, reject) => {
      return login(getinfo).then(res => {
        const data = res
        this.phone = ''
        this.password = ''
        // dispatch('getInfo')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  toSetBottom ({ commit }, flag) {
    commit('setBottomFlag', flag)
  },
  setBottomType ({ commit }, foottype) {
    commit('setBottomType', foottype)
  },
  logout ({ commit }) {
    commit('SET_INFO', {})
    commit('GET_MYGODE', [])
    commit('GET_UNIT', [])
  },
  setunit ({ commit }) {
    return new Promise((resolve, reject) => {
      getAdConfig({
        uid: localStorage['_shop_userId']
      }).then(res => {
        const data = res
        commit('GET_UNIT', data.list)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      // if (window.navigator.userAgent.indexOf('app_ezoo') != -1) {
      //   obj.registerid = native.getIdentity()
      // }
      getinfobyuid(obj).then(res => {
        const data = res.data
        commit('SET_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default new Vuex.Store({
  getters,
  mutations,
  actions,
  state
})
