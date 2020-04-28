class Forma {
    constructor(forma) {
        this.forma = forma;
        this.name = /^[a-zа-яё]*$/i;
        this.phone = /^\+7\(\d{3}\)\d\d\d\-\d\d\d\d$/;
        this.email = /^[a-zA-Z\.\-\_]*@[a-zA-Z]*\.[a-zA-Z]{2,5}$/;
        this.comment = '';
        this.classError = 'error';
    }
    check() {
        this.forma.querySelectorAll('input[type = text]').forEach((element) => {
            var regex = this[element.name];
            var value = element.value;
            if(!regex.test(value)){
                element.classList.add(this.classError);
            }else{
                element.classList.remove(this.classError);
            }
        })
    }
}

const form = new Forma(document.querySelector('form'));

document.querySelector('#check').addEventListener('click', () => {
    form.check();
});


