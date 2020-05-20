<template>
    <div class="goods-list">
        <p v-show="messageStatus">there is\'t data</p>
      <good class="goods-item" v-for="good in goods" :good="good" :key="good.id_product" :cartGoods="cartGoods" :goods="goods" @click="addCart()"></good >
    </div>
</template>

<script>
import good from '../components/goodsItem.vue'
export default {
    data() {
        return {
        }
    },
    event: 'addCart',
    props: ['goods','messageStatus','cartGoods'],
    components: {
        good 
    },
    mounted() {
    },
    methods: {
    }
}
</script>