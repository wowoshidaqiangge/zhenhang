import Vue from 'vue'
import Vuex from 'vuex'
import {login } from '@/api/index'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: '',
    screenHeight: document.documentElement.clientHeight,
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    },
    changeScreenHeight (state, val) {
      state.screenHeight = val
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password,icCard}) {
      return new Promise((resolve, reject) => {
        login({username, password,icCard}).then(res => {
          if(res.code==='0'){
            const data = res.data
            localStorage.setItem('userId',data.id)
            commit('setUserId', data.id)
            resolve(data)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  modules: {

  }
})

export default store
