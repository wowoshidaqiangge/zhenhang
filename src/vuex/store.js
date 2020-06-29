import Vue from 'vue'
import Vuex from 'vuex'
import {login } from '@/api/index'
import { Message } from 'element-ui';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: '',
    screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    newAddRoutes:[]
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    },
    changeScreenHeight (state, val) {
      state.screenHeight = val
    },
    setnewAddRoutes (state, val) {
      state.newAddRoutes = val
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
            
            let arr = []
            if(data.icCard){
              sessionStorage.setItem('icCard',data.icCard)
            }
            data.userMenu.map(item=>{
              arr.push(item.index)
            })
            sessionStorage.setItem('buttonpremissions',JSON.stringify(arr))
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
