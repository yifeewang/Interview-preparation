
## 步骤 1：实现 `createStore` 方法
在 Redux 中，我们使用 `createStore` 方法来创建一个 store 对象。下面是一个基本的 createStore 实现：
```js
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }

  dispatch({ type: '@@redux/INIT' });

  return {
    getState,
    dispatch,
    subscribe
  };
}
```

我们创建了一个 `store` 对象，其中包含了 `getState、dispatch 和 subscribe` 三个方法。

对于初始的 state，我们可以传递一个 initialState 参数来初始化。

在 dispatch 方法中，我们会调用 reducer 函数来更新 state，并遍历所有的 listeners，执行其回调函数以完成 state 的更新。

最后，我们向 store 分发一个名为 @@redux/INIT 的初始 action，这会触发 reducer 的默认分支，将 initialState 作为 state 的初始值。

## 步骤 2：实现 `combineReducers` 方法

在 Redux 中，我们可以使用 `combineReducers` 方法来合并多个 `reducer` 函数。

下面是一个基本的 combineReducer 实现：
```js
function combineReducers(reducers) {
  return function combination(state = {}, action) {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
  }
}
```
`combineReducers` 方法会接收一个 `reducers` 对象，这个对象包含了多个 `reducer` 方法。 

在返回的函数 combination 中，我们会遍历所有的 key，然后用每个 reducer 更新对应的 state。

最后，我们会将所有的 state 更新结果合并到 nextState 对象中，并将其返回。

## 步骤 3：实现 `applyMiddleware` 方法

在 Redux 中，我们可以通过 `applyMiddleware` 方法来对 dispatch 方法进行增强。

下面是一个基本的 applyMiddleware 实现：
```js
function applyMiddleware(...middlewares) {
  return function enhancer(createStore) {
    return function newCreateStore(reducer, initialState) {
      const store = createStore(reducer, initialState);
      let dispatch = store.dispatch;

      const middlewareAPI = {
        getState: store.getState,
        dispatch: action => dispatch(action)
      };

      const chain = middlewares.map(middleware => middleware(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose(...functions) {
  return functions.reduce((f, g) => (...args) => f(g(...args)));
}
```

applyMiddleware 方法接收中间件函数作为参数，返回一个 `enhancer` 函数。

`enhancer` 函数接收 `createStore` 方法作为参数，返回一个新的 `createStore` 方法。

在新的 `createStore` 方法中，我们会将 `store.dispatch` 保存到 `dispatch` 变量中。

利用 middlewareAPI 对象，所有中间件都可以访问到 `getState` 和 `dispatch` 方法。

同时，利用 `compose` 函数把所有的中间件组合成一个函数，然后传给 `dispatch` 变量，成为新的 `dispatch` 方法。

最后，我们返回一个包含新的 `dispatch` 方法的 `store` 对象。

以上就是手写 Redux 源码的基本实现