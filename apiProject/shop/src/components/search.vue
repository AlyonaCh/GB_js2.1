<template>
    <div>
        <input type="text" class="goods-search" v-model="searchLine"/>
        <button class="search-button" type="button" @click="FilterGoods">Искать</button>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            searchLine: ''
        }
    },
    props: [],
    components: {
    },
    mounted() {
    },
    methods: {
        ...mapActions([
            'FILTER_GOODS'
        ]),
        FilterGoods(){
            this.FILTER_GOODS(this.searchLine);
            // if(this.searchLine.length == 0){
            //     this.filteredGoods = this.goods;
            // }else{
            //     this.filteredGoods = this.filteredGoods.filter(good => good.product_name.toLowerCase().includes(this.searchLine.toLowerCase()));
            // if(this.filteredGoods.length == 0){
            //     this.messageStatus = true;
            // }else{
            //     this.messageStatus = false;
            // }
            // }
      },
    }
}
</script>