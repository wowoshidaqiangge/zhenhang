import Vue from 'vue'
import Vuex from 'vuex'
import {login } from '@/api/index'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: '',
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    },
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password}) {
      return new Promise((resolve, reject) => {
        login({username, password}).then(res => {
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
