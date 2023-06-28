class Subject {
    constructor() {
      this.subs = {}
    }
  
    addSub(key, fn) {
      const subArr = this.subs[key]
      if (!subArr) {
        this.subs[key] = []
      }
      this.subs[key].push(fn)
    }
  
    trigger(key, message) {
      const subArr = this.subs[key]
      if (!subArr || subArr.length === 0) {
        return false
      }
      for(let i = 0, len = subArr.length; i < len; i++) {
        const fn = subArr[i]
        fn(message)
      }
    }
  
    unSub(key, fn) {
      const subArr = this.subs[key]
      if (!subArr) {
        return false
      }
      if (!fn) {
        this.subs[key] = []
      } else {
        for (let i = 0, len = subArr.length; i < len; i++) {
          const _fn = subArr[i]
          if (_fn === fn) {
            subArr.splice(i, 1)
          }
        }
      }
    }
  }
  
  // 测试
  // 订阅
  let subA = new Subject()
  let A = (message) => {
    console.log('订阅者收到信息: ' + message)
  }
  subA.addSub('A', A)
  
  // 发布
  subA.trigger('A', '我是xxx')   // A收到信息: --> 我是xxx
  