let CreateSinglePattern = (function(){
    let instance;
    return function(age) {
        if (instance) {
            return instance;
        }
        this.age = age;
        return instance = this;
    }
})();
CreateSinglePattern.prototype.getAge = function() {
    return  this.age
}

let young = new CreateSinglePattern('18');
let old = new CreateSinglePattern('108');
let old2 = new CreateSinglePattern();

console.log(young === old); // true
console.log(young === old2); // true
console.log(old === old2); // true
console.log(young.getAge());  // '18'
console.log(old.getAge());  // '18'