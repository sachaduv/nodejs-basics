function func1(){
    console.log('called func1 from module1')
}

var hello1 = 'Hello World from module 1';

module.exports.func1 = func1;
module.exports.hello = hello1;