let form = document.querySelector ('#uForm')
let btn = document.querySelector ('#okBtn')

btn.addEventListener ('click', createBurger)

function createBurger () {
    let newBurger = new Burger ('Size', 'Ingredients')
    document.querySelector(`.price p`).innerHTML = newBurger.price;
    document.querySelector(`.callories p`).innerHTML = newBurger.callories;
}

class Burger {
    constructor (size, ingredients) {
        this.size = this._check (size)
        this.ingredients = this._getArray (ingredients)
        this.price = this._getPrice (size, ingredients)
        this.callories = this._getCallories (size, ingredients)
    }
    _text (attrName) {
        let obj = document.querySelector (`input[name=${attrName}]`)
        return obj.value
    }
    _check (attrName) {
        let obj = document.querySelector (`input[name=${attrName}]:checked`)
        return obj.value
    }
    _getArray (attrName) {
        let objArr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)]
        let arr = []
        objArr.forEach (el => {
            arr.push (el.value)
        })
        return arr
    }

    _getPrice (size, ingredients){
        let obj = document.querySelector (`input[name=${size}]:checked`)
        let objArr = [...document.querySelectorAll (`input[name=${ingredients}]:checked`)]
        let price = 0
        price = parseInt(obj.dataset['price'])
        objArr.forEach (el => {
            price += parseInt(el.dataset['price'])
        })
        return price
    }

    _getCallories (size, ingredients){
        let obj = document.querySelector (`input[name=${size}]:checked`)
        let objArr = [...document.querySelectorAll (`input[name=${ingredients}]:checked`)]
        let callories = 0
        callories = parseInt(obj.dataset['callories'])
        objArr.forEach (el => {
            callories += parseInt(el.dataset['callories'])
        })
        return callories
    }
}
