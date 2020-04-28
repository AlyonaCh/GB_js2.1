var regex= /\s'|'\s/g;
var text = 'I say: \'Hello, I\'m Alyona\' ';
console.log(text);
console.log(text.replace(regex, '"'));