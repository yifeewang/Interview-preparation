function fn() {
    return function (val, wait) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(val)
            }, wait);
        })
    }
}

const newFn = fn();

class AjaxUtils {
    constructor() {
        this.concurrency = 3;
        this.count = 0;
        this.queue = [];
        this.subQueue = [];
    }
    http(request) {
        this.queue.push(request)
        this.walk();
    }
    walk() {
        if(this.count < this.concurrency) {
            const left = this.concurrency - this.count;
            let min = Math.min(left, this.queue.length);
            while(min--) {
                const req = this.queue.shift();
                req.then((val) => {
                    console.log(val)
                    this.count--;
                    this.walk();
                })
            }
        }
    }
}

const ajax = new AjaxUtils();
ajax.http(newFn(1, 100))
ajax.http(newFn(2, 200))
ajax.http(newFn(3, 1000))
ajax.http(newFn(4, 700))
ajax.http(newFn(5, 2000))
ajax.http(newFn(6, 200))
ajax.http(newFn(7, 500))