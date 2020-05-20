<template>
    <div>
        <img :src="image" alt="Some img">
        <div>
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
            <button class="item-button" @click="addCart()">Купить</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            image : 'https://placehold.it/200x150',
        }
    },
    props: ['good','cartGoods','goods'],
    components: {
    },
    mounted() {
    },
    methods: {
        addCart(){
            this.$parent.$parent.addCart(this.good);
        },
    }
}
</script>