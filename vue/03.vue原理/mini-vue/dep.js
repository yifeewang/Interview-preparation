// 负责收集watcher，当数据改变，就会通知各watcher调用自身的update方法，从而更新时图
class Dep {
    constructor() {
        // 存储依赖
        this.subs = []
    }
    // 收集依赖
    addSub(sub) {
        if(sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 通知依赖
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}