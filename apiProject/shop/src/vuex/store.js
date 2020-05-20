import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

// запуск json-server --watch db.json

const store = new Vuex.Store({
    state: {
        goods: [],
        filteredGoods: [],
        cart: []
    },
    mutations: {
        SET_GOODS_TO_STATE: (state, goods) => {
            state.filteredGoods = goods;
            goods.forEach (item => {
                item.quantity = 0;
            })
            state.goods = goods;
        },
        SET_CART: (state, good) => {
            let find = state.cart.find (element => element.id_product === good.id_product);
            if (!find) {
                state.cart.push(good);
            }
            state.cart.find(element => element.id_product === good.id_product).quantity++;
        },
        REMOVE_FROM_CART: (state, id) => {
            let find = state.cart.find (element => element.id_product === id);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                state.cart.splice(state.cart.indexOf(find), 1);
            }
        },
        GET_FILTER: (state, searchLine) => {
            state.filteredGoods = state.goods;
            if(searchLine.length != 0){
                state.filteredGoods = state.filteredGoods.filter(good => good.product_name.toLowerCase().includes(searchLine.toLowerCase()));
            }
        },
        EMPTY_CART: (state) => {
                    state.cart.splice(0,state.cart.length);
                }
        },
    actions:{
        GET_GOODS_FROM_API({commit}){
            return axios('http://localhost:3000/goods', {
                method: 'GET'
            })
            .then(( goods )=>{
                
                commit('SET_GOODS_TO_STATE', goods.data);
                return goods;
            })
            .catch((error =>{
                console.log(error);
                return error;
            }))
        },
        ADD_TO_CART({commit}, good){
            commit('SET_CART',good);
        },
        DELETE_FROM_CART({commit}, id){
            commit('REMOVE_FROM_CART', id);
        },
        DELETE_ALL_CART({commit}){
            commit('EMPTY_CART');
        },
        FILTER_GOODS({commit}, searchLine){
            commit('GET_FILTER', searchLine);
        }
    },
    getters:{
        GOODS(state){
            return state.goods;
        },
        CART(state){
            return state.cart;
        },
        FILTER(state){
            return state.filteredGoods;
        }
    }
  })

export default store;