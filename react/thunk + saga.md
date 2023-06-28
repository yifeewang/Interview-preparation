## redux数据流向
首先dispatch触发一个action，然后由store自动调用reducers，返回新的state，当state改变时，store就会调用监听函数，进而视图发生改变。

## redux不支持异步action
当我们在action里面调用异步操作时，如下：
```js
export function decreaseAsyncCount() {
  return () => {
    // 异步操作
    setTimeout(function () {
      store.dispatch(inscreaseCount());
    }, 1000);
  };
}
```
结果会报错误：
一般我们的解决方案是使用中间件，而`redux-thunk`和`redux-saga`被讨论最多。

## 什么是Redux中间件？

`redux中间件`的中间指的是`action`和`store`中间

`redux中间件`实际是对`dispatch`方法的封装或升级，升级之后，`dispatch`就既能接收对象，也能接收函数

补充：中间件指的是redux的中间件，不是react的。

## redux-thunk和redux-sage区别

1. `redux-thunk`

`原理：`
```js
const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  return next(action);
};
```
这个函数返回一个中间件，在 Redux 中通过 applyMiddleware 使用。

这个中间件的作用是判断 action 是否为一个函数，如果是函数则会调用它并将 store.dispatch 和 store.getState 作为参数传入，否则会将 action 交给下一个中间件处理。

可以看出，这个实现大致遵循了 Redux Thunk 的原理，通过返回一个函数来处理异步操作。当使用这个中间件时，我们可以将 action 创建函数重写为返回一个函数，


注册中间件,使用`applyMiddleware`

```js
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 为了thunk与devtools一起使用
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
 ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
 : compose
const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(reducer, enhancer)

export default store
```
在action中使用，`使用了redux-thunk中间件之后，action返回就可以是一个函数，不再必须是对象`
在这个函数中，我们可以发起异步请求来获取数据,而且返回的函数会被注入`dispatch`这个参数，我们不再需要引入`store`
```js
// store/actionCreators.js

export const getTodoList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3000/list')
    const action = initListAction(res.data)
    dispatch(action)
  }
}
```
在页面组件中:
```js
import {getTodoList} from './store/actionCreators'
const TodoList = () => {
  // 发送请求获取数据
  const getList = async () => {
    const action = getTodoList()
    store.dispatch(action) // 注入dispatch
  }
}
```

上面的代码是使用`redux-thunk`的代码
当我们返回的是函数时，store会帮我们调用这个返回的函数，并且把dispatch暴露出来供我们使用。
对于redux-thunk的整个流程来说，它是等异步任务执行完成之后，我们再去调用dispatch，然后去store去调用reduces。，如下图：


`redux-saga`:
Redux Saga 是一个 Redux 中间件，用于管理应用程序中的异步操作。
相比于 Redux Thunk，Redux Saga 更加强大和灵活，也更容易进行测试和调试。
使用 Redux Saga 需要先安装：
```js
npm install redux-saga

然后在 Redux store 的创建过程中使用 applyMiddleware 方法来引入 Redux Saga 中间件：
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
```

在上面的代码中，我们引入了 createSagaMiddleware 并创建了一个中间件 sagaMiddleware。
然后我们将 sagaMiddleware 应用到 Redux store 中，并调用 run 方法来启动 Sagas。
接下来，我们创建 Sagas。
`Sagas` 可以看作是一个类似于 `Generator` 的函数，它`通过监听 Redux 中的 action 来驱动异步操作`。

下面是一个示例 Saga 的代码：
```js
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchUserSuccess, fetchUserFailure } from './actions';
import { FETCH_USER_REQUEST } from './constants';
import axios from 'axios';

function* fetchUser(action) {
  try {
    const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${action.payload.userId}`);
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_USER_REQUEST, fetchUser);
}

export default rootSaga;
```

在上面的代码中，我们首先定义了一个 `fetchUser` Saga，该 Saga 监听 `FETCHUSERREQUEST` action，并在 action 被触发时执行 fetchUser 函数。

fetchUser 函数使用 `call` 和 `put` 方法来执行异步操作并 dispatch 对应的 action。

特别地，`call` 方法用于调用异步函数，`put` 方法用于 dispatch action。

在该函数中，我们首先使用 `call` 方法发送网络请求并异步获取用户数据（可以看作是 redux-thunk 中的异步操作），然后根据请求结果使用 `put` 方法 dispatch 对应的 action。

需要注意的是，在 Saga 中使用 call 方法调用异步函数时，我们不需要使用 Promise 的 .then 或者 .catch 方法，而是使用 try/catch 来处理可能的错误。

接下来，我们定义一个 `rootSaga` 函数，用于启动监听。在该函数中，我们使用 takeEvery 方法监听 FETCHUSERREQUEST action，当 action 被触发时执行 fetchUser 函数。

最后，我们将 rootSaga 导出。

最后，我们在组件中 dispatch 我们的 action：
```js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequest } from './actions';

const User = ({ userId }) => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUserRequest(userId));
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};
```
在上面的代码中，我们使用 useDispatch 钩子获取到 store 的 dispatch 方法，然后调用我们定义的 fetchUserRequest action。

在调用时，我们传入了 userId 参数。在 useEffect 中，我们依赖 userId 参数并在 userId 发生改变时重新执行 useEffect，对应的 fetchUserRequest action 也会被重新执行。

当我们调用 fetchUserRequest action 时，Redux Saga 将会捕获这个 action，并根据我们定义的 rootSaga 执行对应的 Saga。

在 Saga 中，我们使用 call 和 put 方法执行异步操作并 dispatch 对应的 action。

最终，Redux store 的 state 将会根据 dispatch 的 action 做出相应的更新。