class Observer {
    constructor(data) {
        this.walk(data);
    }
    // 遍历data属性
    walk(data) {
        if(!data || typeof data !== 'object') return;
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        })
    }
    // 给data属性添加getter/setter
    defineReactive(obj, key, val) {
        const that = this;
        // 递归处理val为对象的属性
        this.walk(val);
        // 为每个属性创建一个Dep（负责收集依赖和通知依赖）
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                // 依赖收集
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(newVal) {
                if(newVal === val) return;
                val = newVal;
                // 设置为对象的时候，要重新为其属性添加getter/setter
                that.walk(newVal);
                // 通知依赖
                dep.notify();
            }
        })
    }
}