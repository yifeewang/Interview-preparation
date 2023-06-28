## react-redux

1. 安装react-redux yarn add react-redux
2. 创建store

```js
import { createStore } from 'redux'
import reducer from './reducers'

const store = createStore(reducer)

export default store
```

`连接react-redux,使用Provider,注册到上下文`:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import TodoList from './todolist'
import { Provider } from 'react-redux'
import store from './react-redux'

// react-redux连接store
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoList />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
```

`在组件中通过connect使用`:
```js
import React from 'react'
import { Button, Input, List } from 'antd'
import { connect } from 'react-redux'

const TodoList = (props) => {
  const { inputValue, list, handleChange, handleAdd, handleDel } = props

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Input
          style={{ width: 200 }}
          value={inputValue}
          onChange={handleChange}
        />
        <Button type="primary" onClick={handleAdd}>
          提交
        </Button>
      </div>
      <List
        size="large"
        bordered
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item key={item} onClick={() => handleDel(index)}>
            {item}
          </List.Item>
        )}
      />
    </>
  )
}

// 将state映射到props中
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
  }
}
// 将dispatch映射到props中，可以在此处写处理函数，也可以将dispatch从组件props中解构出来，直接在组件中进行dispatch分发，此处就可以不必写，只传一个mapStateToProps参数即可
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(e) {
      dispatch({
        type: 'change_input_value',
        value: e.target.value,
      })
    },
    handleAdd() {
      dispatch({
        type: 'add_list',
      })
    },
    handleDel(index) {
      dispatch({
        type: 'del_list',
        value: index,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

```

数据处理逻辑同样在reducer中
