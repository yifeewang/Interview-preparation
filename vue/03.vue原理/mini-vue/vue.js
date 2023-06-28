class Vue {
    constructor(options) {
        // 初始化参数
        this.$options = options;
        this.$data = options.data;
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
        // 把data数据挂载到vm实例上，并且实现getter/setter
        this._proxyData(this.$data)
        // 劫持data，给其属性添加getter/setter
        new Observer(this.$data)
        // 解析模板指令和插值表达式
        new Compiler(this);
    }
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return data[key];
                },
                set(newVal) {
                    if(newVal === data[key]) return;
                    data[key] = newVal;
                }
            })
        })
    }
}