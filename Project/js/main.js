const image = 'https://placehold.it/200x150';
const API_URL = 'https://raw.githubusercontent.com/AlyonaCh/GB_js2/branch-2/Project/server';



document.querySelector('.cart-button').addEventListener('click', () => {
  document.querySelector('.cart-block').classList.toggle('invisible');
});

document.querySelector('.cart-block').addEventListener ('click', (evt) => {
  if (evt.target.classList.contains ('del-btn')) {
    userCart.removeProduct (evt.target);
  }
})

document.querySelector('.goods-list').addEventListener ('click', (evt) => {
  if (evt.target.classList.contains ('item-button')) {
    userCart.addProduct(evt.target);
  }
})

class GoodsItem {
  constructor(title, price, id, img) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.img = img;
  }
  render() {
    return `<div class="goods-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div>
                <h3>${this.title}</h3>
                <p>${this.price} $</p>
                <button class="item-button" 
                  data-id="${this.id}"
                  data-title="${this.title}"
                  data-image="${this.img}"
                  data-price="${this.price}">Купить</button>
              </div>
            </div>`;
    
  }
}


class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    promiseReq(`${API_URL}/index.json`)
      .then(dataJSON => {
        this.goods = JSON.parse(dataJSON);
      })
      .then(() => {
        this.render();
      })
  }
  render() {
    let listHtml = '';
    console.log(this.goods);
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.id_product, image);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  sumItems() {
    let sum = 0;
    this.goods.forEach(good => {
      sum += parseInt(good.price);
    });
  }
}

const list = new GoodsList();
list.fetchGoods();

class CardItem extends GoodsItem {
  render() {
    return `<div data-id="${this.id}">
              <div>
                <img src="${this.img}" alt="Some image">
                <div>
                  <p>${this.title}</p>
                  <p>Кол-во: ${this.quantity}</p>
                  <p>$${this.price} each</p>
                </div>
              </div>
              <div>
                <p>${this.quantity * this.price}</p>
                <button data-id="${this.id}">&times;</button>
              </div>
            </div>`;
  }
}

class Cart {

  constructor() {
    this.cart = [];
  }
  
  addProduct(product){
    let productId = +product.dataset['id'];
    let find = this.cart.find (element => element.id === productId);
    if (!find) {
      this.cart.push ({
        id: productId,
        title: product.dataset['title'],
        img: image,
        price: +product.dataset['price'],
        quantity: 1
      })
    } else {
      find.quantity++
    }
    this.renderCart();
  }
  removeProduct (product) {
    let productId = +product.dataset['id'];
    let find = this.cart.find (element => element.id === productId);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(find), 1);
                document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
            }
            this.renderCart ();
  }
  renderCart () {
      let allProducts = '';
      for (let el of this.cart) {
        allProducts += `<div class="cart-item" data-id="${el.id}">
                          <div>
                            <img src="${el.img}" alt="Some image">
                            <div>
                              <p>${el.title}</p>
                              <p>Quantity: ${el.quantity}</p>
                              <p>Price: $${el.price}</p>
                            </div>
                          </div>
                          <div>
                            <p>Sum: ${el.quantity * el.price}</p>
                            <button class="del-btn" data-id="${el.id}">Del</button>
                          </div>
                        </div>`
            }

            document.querySelector(`.cart-block`).innerHTML = allProducts;
  }
}

var userCart = new Cart();

function makeGETRequest(url, resolve, reject) {
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if(xhr.status === 200){
        resolve(xhr.responseText);
      }else{
        reject ('error');
      }
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}

function promiseReq(url) {
  return new Promise ((res, rej) =>{
    makeGETRequest(url, res, rej);
  })
}