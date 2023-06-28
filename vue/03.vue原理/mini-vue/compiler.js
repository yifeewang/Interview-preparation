class Compiler {
    constructor(vm) {
        this.vm = vm;
        this.el = vm.$el;
        // 解析模板指令和插值表达式
        this.compile(this.el);
    }
    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            // 文本节点
            if(this.isTextNode(node)) {
                this.compileText(node)
            // 元素节点
            } else if(this.isElementNode(node)) {
                this.compileElement(node)
            }
            // 存在子节点则进行递归
            if(node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }
    compileElement(node) {
        Array.from(node.attributes).forEach(attri => {
            // 判断是否是指令
            let attrName = attri.name
            if(this.isDirective(attri)) {
                // v-text --> text
                attrName = attrName.substr(2)
                let key = attri.value
                this.updator(node, key, attrName)
            }
        })
    }
    updator(node, key, attrName) {
        const updatorFunc = this[attrName+ 'Updator'];
        updatorFunc && updatorFunc.call(this, node, key, this.vm[key])
        
    }
    // v-text
    textUpdator(node, key, value) {
        node.textContent = value
        // 创建Watcher对象，当数据改变更新时图
        new Watcher(this.vm, key, (newVal) => {
            node.textContent = newVal
        })
    }
    // v-model
    modelUpdator(node, key, value) {
        node.value = value
        // 创建Watcher对象，当数据改变更新时图
        new Watcher(this.vm, key, (newVal) => {
            node.value = newVal
        })
        // 给节点添加事件，视图改变，更新数据
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
        
    }
    // 处理文本节点
    compileText(node) {
        const value = node.textContent;
        // 匹配插值表达式
        const regxp = /\{\{(.+?)\}\}/
        if(regxp.test(value)) {
            const key = RegExp.$1.trim();
            if(key.includes('.')) {
                let handleValue = this.vm;
                key.split('.').forEach(i => {
                    handleValue = handleValue[i]
                });
                node.textContent = value.replace(regxp, handleValue)

                new Watcher(this.vm[key.split('.')[0]], key.split('.')[1], (newVal) => {
                    node.textContent = newVal
                })
            } else {
                node.textContent = value.replace(regxp, this.vm[key])

                new Watcher(this.vm, key, (newVal) => {
                    node.textContent = newVal
                })
            }
        }
    }
    isDirective(attri) {
        return attri.name.startsWith('v-');
    }
    isTextNode(node) {
        return node.nodeType === 3;
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
}