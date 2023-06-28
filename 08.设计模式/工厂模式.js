//1.简单工厂模式
// function bookShop (name, year, vs) {
//     const book = new Object();
//     book.name = name;
//     book.year = year;
//     book.vs = vs;
//     book.price = '暂无标价';
//     if (name === 'JS高级编程') {
//       book.price = '79';
//     }
//     if (name === 'react进阶') {
//       book.price = '69';
//     }
//     if (name === 'js设计模式') {
//       book.price = '89';
//     }
//     return book;
//   }
//   const book1 = bookShop('JS高级编程', '2013', '第三版');
//   const book2 = bookShop('react进阶', '2017', '第六版');
//   const book3 = bookShop('js设计模式', '2015', '第一版');
//   console.log(book1)
//   console.log(book2)
//   console.log(book3)

//2.工厂方法模式
// const BookShop = function (name) {
//     // 如果外部直接调用了BookShop而不是new关键字调用，则返回new BookShop调用，否则直接调用
//     // 这个产品类创建实例返给外部
//     if (this instanceof BookShop) {
//       const book = new this[name]()
//       return book
//     } else {
//       return new BookShop(name)
//     }
//   }
//   BookShop.prototype = {
//     Programme: function () {
//       this.Books = ['JS高级编程', 'react进阶', 'js设计模式']
//     },
//     Science: function () {
//       this.Books = ['a', 'b', 'c']
//     },
//     Society: function () {
//       this.Books = ['aa', 'bb', 'cc']
//     }
//   }
  
//   const programme = new BookShop('Programme');
//   const science = BookShop('Science');
//   const society = BookShop('Society');
//   console.log(programme) // Books: (3) ['JS高级编程', 'react进阶', 'js设计模式']
//   console.log(science) // Books: (3) ['a', 'b', 'c']
//   console.log(society) // Books: (3) ['aa', 'bb', 'cc']

  //3、抽象工厂模式 
  // 用于创建不同的类
  const Factorys = function (subType, superType) {
    if (typeof Factorys[superType] === 'function') {
      const F = function() {}
      F.prototype = new Factorys[superType]()
      subType.constructor = subType
      subType.prototype = new F()
    } else {
      throw new Error('没有找到' + superType + '抽象类')
    }
  }
  Factorys.Animals = function () {
    this.type = 'Animals'
  }
  Factorys.Animals.prototype = {
    getInfo: function () {
      return new Error('请先重写子类')
    }
  }
  
  Factorys.Fruits = function () {
    this.type = 'Fruits'
  }
  Factorys.Fruits.prototype = {
    getInfo: function () {
      return new Error('请先重写子类')
    }
  }
  
  Factorys.Books = function () {
    this.type = 'Books'
  }
  Factorys.Books.prototype = {
    getInfo: function () {
      return new Error('请先重写子类')
    }
  }
  
  Factorys.Peoples = function () {
    this.type = 'Peoples'
  }
  Factorys.Peoples.prototype = {
    getInfo: function () {
      return new Error('请先重写子类getInfo方法')
    }
  }
  
  const Animals = function (name, price) {
    this.name = name
    this.price = price
  }
  Factorys(Animals, 'Animals')
  Animals.prototype.getInfo = function () {
    return this.price;
  }
  
  const Fruits = function (name, price) {
    this.name = name
    this.price = price
  }
  Factorys(Fruits, 'Fruits')
  Fruits.prototype.getInfo = function () {
    return this.price
  }
  
  const Peoples = function (name, price) {
    this.name = name
    this.price = price
  }
  Factorys(Peoples, 'Peoples')
  Peoples.prototype.getInfo = function () {
    return this.price
  }
  
  const Books = function (name, price) {
    this.name = name
    this.price = price
  }
  Factorys(Books, 'Books')
  Books.prototype.getInfo = function () {
    return this.price
  }
  
  const dog = new Animals('小狗', 3000)
  console.log('价钱：' + dog.getInfo() + '，类型：' + dog.type)
  const tomato = new Fruits('西红柿', 20)
  console.log('价钱：' + tomato.getInfo() + '，类型：' + tomato.type)
  const martian = new Peoples('火星人', 6989)
  console.log('价钱：' + martian.getInfo() + '，类型：' + martian.type)
  const book = new Books('js设计模式', 100)
  console.log('价钱：' + book.getInfo() + '，类型：' + book.type)