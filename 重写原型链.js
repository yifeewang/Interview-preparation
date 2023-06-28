// 编写 start - end 之间的代码，使得输出  world male world2

// 这里是重写 setAttributes方法，， 通过 defineProperty，只给get方法，无set，无法直接修改

function Clazz() {}
Clazz.prototype.setAttributes = function (key, val) {
    this[key] = val;
}

// start
const oldSetAttributes = Clazz.prototype.setAttributes;
Clazz.prototype.setAttributes = function (key, val) {
    oldSetAttributes.apply(this, [key, val]);
    Object.defineProperty(this, key, {
        get() {
            return this.lib ? this.lib[key] : undefined;
        }
    })
    this.lib = this.lib ? {...this.lib} : {}
    this.lib[key] = val;
}
// end

const clazz1 = new Clazz();
const clazz2 = new Clazz();

clazz1.setAttributes("name", "world");
clazz1.setAttributes("sex", "male");
clazz1.name = "Hello";
clazz1.sex = "female";

clazz2.setAttributes("name", "world2");
clazz2.name = "world22222";

console.log(clazz1, clazz2);
console.log(clazz1.name, clazz1.sex);
console.log(clazz2.name);