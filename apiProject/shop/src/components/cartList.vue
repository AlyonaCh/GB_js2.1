<template>
    <div>
        <good v-for="cartGood in CART" :key="cartGood.id_product" :cartGood="cartGood" ></good>
    </div>
</template>

<script>
import good from '../components/cartItem.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
    data() {
        return {
        }
    },
    props: [],
    components: {
        good
    },
    computed:{
        ...mapGetters([
        'CART'
        ]),
    },
    mounted() {
    },
    methods: {
        ...mapActions([
            'DELETE_FROM_CART',
        ]),
        delCart(id){
            this.DELETE_FROM_CART(id);
        },
    }
}
</script>