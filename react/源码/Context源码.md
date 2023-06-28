以下是手写一个简单的`Context的源码`实现，包括`MyContext.Provider`和`MyContext.Consumer`：

```js
import React from 'react';

// 自定义Context类
class MyContext {
  constructor(defaultValue) {
    this._currentValue = defaultValue;
  }

  // 定义Provider组件
  Provider = ({ value, children }) => {
    this._currentValue = value;
    return children; // 将所有子组件返回
  };

  // 定义Consumer组件
  Consumer = ({ children }) => {
    return children(this._currentValue);   // 将当前值作为参数传递给函数子组件并返回子组件
  };
}

// 创建一个新的Context
const context = new MyContext(0);

// 在父组件中使用Provider将数据传递给子组件
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <context.Provider value={count}>
      <Child />
    </context.Provider>
  );
}

// 在子组件中使用Consumer获取上面传递的数据
function Child() {
  return (
    <context.Consumer>
      {count => <h1>{count}</h1>}
    </context.Consumer>
  );
}

export default App;
```

在这个简单的实现中，我们将创建自定义`Context`的代码包装在一个类中。
类包含两个方法，即`Provider`和`Consumer`。
在MyContext.Provider组件中，我们将value赋值给_currentValue，它将由MyContext.Consumer使用。在MyContext.Consumer组件中，我们将_currentValue作为参数传递到一个函数子组件中，子组件可以从props中接收这个参数并进行相应的操作。
总之，Context使我们可以在组件树中传递数据而不必通过中间组件传递，并公开API使它们易于使用和删除。