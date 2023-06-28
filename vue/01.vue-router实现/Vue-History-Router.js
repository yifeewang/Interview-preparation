// eslint-disable-line
let _Vue = null;
class VueRouter {
    static install(Vue) {
        if(VueRouter.install.hasInstall) return;
        VueRouter.install.hasInstall = true;
        _Vue = Vue;
        _Vue.mixin({
            beforeCreate() {
                if(this.$options.router) {
                    _Vue.prototype.$router = this.$options.router 
                }
            },
        })
    }

    constructor(options) {
        this.options = options;
        this.routerMap = {};
        this.data = _Vue.observable({
            current: window.location.pathname
        })
        this.init()
    }

    init() {
        this.createRouteMap();
        this.initComponents(_Vue);
        this.initEvent();
    }

    createRouteMap() {
        this.options.routes.forEach(item => {
            this.routerMap[item.path] = item.component
        })
    }

    initComponents(Vue) {
        let self = this;
        Vue.component("router-link", {
            props: {
                "to": String
            },
            render(h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.routerClick
                    }
                }, [this.$slots.default])
            },
            methods: {
                routerClick(e) {
                    e.preventDefault();
                    history.pushState(null, null, this.to);
                    self.data.current = this.to;
                }
            },
        })
        Vue.component("router-view", {
            render(h) {
                const key = self.routerMap[self.data.current] ? self.data.current : '*';
                const cp = self.routerMap[key];
                return h(cp)
            },
        })
    }

    initEvent() {
        let self = this;
        window.addEventListener("popstate", function(e) {
            self.data.current = window.location.pathname;
        })
    }
}

export default VueRouter;