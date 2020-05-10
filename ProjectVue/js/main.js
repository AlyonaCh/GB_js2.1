
const API = 'https://raw.githubusercontent.com/AlyonaCh/GB_js2/branch-2/Project/server'
const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    cartGoods: [],
    searchLine: '',
    catalogUrl: '/index.json',
    isVisibleCart: false,
    messageStatus: false,
    image : 'https://placehold.it/200x150',
    cartImage : 'https://placehold.it/100x80'
  },
  methods: {
    makeGETRequest(url) {
      return fetch(API + url).then(d => d.json());
    },
    getQuantity(){
      this.goods.forEach (item => {
          item.quantity = 0;
      })
    },
    FilterGoods(){
      if(this.searchLine.length == 0){
        this.filteredGoods = this.goods;
      }else{
        this.filteredGoods = this.filteredGoods.filter(good => good.product_name.toLowerCase().includes(this.searchLine.toLowerCase()));
        if(this.filteredGoods.length == 0){
          this.messageStatus = true;
        }else{
          this.messageStatus = false;
        }
      }
    },
    addCart(id){
      let find = this.cartGoods.find (element => element.id_product === id);
      if (!find) {
        let good = this.goods.find (element => element.id_product === id);
        good.quantity++;
        this.cartGoods.push(good);
      }else{
        find.quantity++;
      }
    },
    delCart(id){
      let find = this.cartGoods.find (element => element.id_product === id);
      if (find.quantity > 1) {
        find.quantity--;
      } else {
        this.cartGoods.splice(this.cartGoods.indexOf(find), 1);
      }
      this.isVisibleCart = false;
    }
  },
  mounted() {
    this.makeGETRequest(this.catalogUrl)
        .then(data => {this.goods = data;this.filteredGoods = data})
        .then(() => { this.getQuantity() })
  }

});