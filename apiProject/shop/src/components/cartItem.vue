<template>
    <div>
        <div>
            <img :src="cartImage" alt="Some image">
            <div>
                <p>{{ cartGood.product_name }}</p>
                <p>Кол-во: {{ cartGood.quantity }}</p>
                <p>${{ cartGood.price }} each</p>
            </div>
        </div>
        <div>
            <p>{{ cartGood.quantity * cartGood.price }}</p>
            <button v-on:click="delCart(cartGood.id_product)">&times;</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cartImage : 'https://placehold.it/100x80'
        }
    },
    props: ['cartGood'],
    components: {
    },
    mounted() {
    },
    methods: {
        delCart(id){
            this.$parent.delCart(id);
        }
    }
}
</script>