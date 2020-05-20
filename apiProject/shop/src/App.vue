<template>
  <div id="app">
    <header>
      <h1 class="logo">Logo</h1>
      <search></search>
      <div class="cart">
        <button class="cart-button" type="button" v-on:click="isVisibleCart=!isVisibleCart">Корзина</button>
        <cart class="cart-block" v-show="isVisibleCart" ></cart>
      </div>
    </header>
    <main>
      <catalog :goods="FILTER" :messageStatus="messageStatus" :cartGoods="cartGoods" />
    </main>
    
  </div>
</template>

<script>
import catalog from './components/goodsList.vue'
import cart from './components/cartList.vue'
import search from './components/search.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      goods: [],
      filteredGoods: [],
      cartGoods: [],
      catalogUrl: '/index.json',
      isVisibleCart: false,
      messageStatus: false,
    }      
  },
  components: {
    catalog, cart, search
  },
  computed:{
    ...mapGetters([
      'GOODS',
      'FILTER'
    ]),
  },
  methods: {
    ...mapActions([
      'GET_GOODS_FROM_API',
      'ADD_TO_CART',
      'DELETE_ALL_CART'
    ]),
    addCart(data){
      this.ADD_TO_CART(data);
    },
    deleteCart(){
      this.DELETE_ALL_CART()
    }
  },
  mounted() {
    this.GET_GOODS_FROM_API()
  }
}
</script>
