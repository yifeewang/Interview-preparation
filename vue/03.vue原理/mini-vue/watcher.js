// 为视图上的每个指令和变量都创建一个watcher
class Watcher {
    constructor(vm, key ,cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        // 把watcher记录到Dep类的静态属性target上
        Dep.target = this;
        // 触发get方法，会调用dep的addSub方法，把当前watcher实例添加进dep实例的subs
        // 后续数据改变会触发set方法，从而触发dep的notify方法，遍历subs调用各watcher的update方法，从而更新时图
        this.oldValue = vm[key];
        // 重置
        Dep.target = null;
    }
    update() {
        const newVal = this.vm[this.key];
        if(newVal === this.oldValue) return;
        this.cb(newVal)
    }
}