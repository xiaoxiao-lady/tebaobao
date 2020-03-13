import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userCartNum:'0',  // 购物车商品数量
        confirmAddress: '', // 确认订单修改收货地址
    },
    mutations:{
        /**
         * 
         * 修改购物车商品数量
         * @param {any} state 
         * @param {any} data 
         */
        CartNum(state,data) {
            state.userCartNum = data
        },
        /**
         *  确认订单修改收货地址
         */
        editAddress(state,data = '') {
            state.confirmAddress = data
        }

    },
    actions:{
        contentnum({commit},data){
            http.getgetnum(data).then(res=>{
                if(res.status == 200) {
                    commit('CartNum',res.data.countnum)
                    if(Number(res.data.countnum) > 0) {
                        uni.setTabBarBadge({
                            index: 3,
                            text: `${res.data.countnum}`
                        })
                    } else {
                        uni.removeTabBarBadge()
                    }
                }
            })
            
        }  
    }
})

export default store