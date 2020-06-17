import Vue from 'vue'
import Vuex from 'vuex'
import {login } from '@/api/index'
import { Message } from 'element-ui';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: '',
    screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
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
            sessionStorage.setItem('userId',data.id)
            if(data.icCard){
              sessionStorage.setItem('icCard',data.icCard)
            }
            
            commit('setUserId', data.id)
            resolve(data)
          }else{
            Message.error(res.msg)
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
