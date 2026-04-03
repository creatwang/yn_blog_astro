---
title: '第一节、redux 介绍'
---

# 第一节、redux 介绍

> `Redux`  **是`JavaScript`的状态容器**，提供了可预测的状态管理，对与应用中越来越多，越来越复杂的数据进行管理。

- 优势：包括依赖在内，**大小只有2kb**
- `Redux`除了和`React`一起使用之外，可以**在任何地方使用**（比如`Vue`，小程序）



## redux 三大原则



### 1、单一数据源

- 整个应用程序的state被存储在一颗 `object tree` 中，并且这个 `object tree` 只存储在一个 `store` 中：

- `Redux`并**没有强制让我们不能创建多个** `Store`，但是那样做并不利于数据的维护；
- 单一的数据源可以让整个应用程序的 `state` 变得**方便维护、追踪、修改**；



### 2、State是只读的

- **唯一修改 `State` 的方法一定是触发 `action**`，不要试图在其他地方通过任何的方式来修改State：
- 这样就**确保了 `View` 或网络请求都不能直接修改 state** ，它们只能通过`action`来描述自己想要如何修改`state`；
- 这样可以**保证所有的修改都被集中化处理**，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题；



### 3、使用纯函数来执行修改

- 通过 `reducer` 将 旧 `state` 和 `actions` 联系在一起，并且返回一个新的`State`：

- 随着应用程序的复杂度增加，我们可以将 `reducer` 拆分成多个小的 `reducers`，分别操作不同 `state tree` 的一部分；

- ##### 但是所有的`reducer`都应该是纯函数，不能产生任何的副作用；

  > 还是 SCU 优化浅层比较的原因。

- 要每次都返回新的state， 这个比较和组件中的state



# 第二节、redux 的核心



## Store

> 当在整个应用中进行管理全局状态，如果没有定义**统一的规范**来操作这段数据，那么整个数据的变化就是**无法跟踪**的，出现了 `bug` 很难维护的

- 而 `store` 就是应用中，统一管理状态的对象



## action-dispatch

- 所有状态的变化，**只能由 `dispacth` 进行修改**，整个是 `redux` 的原则。

  > 方便 `react-devtool` 进行跟踪，所有的状态变化都是**可跟追、可预测的**



## reducer

> `reducer` 必须是一个纯函数，用来**将 `dispatch` 和 `state` 联系在一起**

- `reducer`做的事情就是将传入的 `state` 和 `action` 结合起来生成一个新的`state`
- 参数一:  上次返回的 `state`
- 参数二：`action` 对象



# 第三节、Redux的使用过程

> 需要先进行安装redux库 `npm install redux`



## 一、初始化 redux-store，配置reducer

- `reducer` 要保证是一个纯函数

  > 之所以是纯函数的原因，还是 `SCU` 优化，浅层比较的原因，此处的浅层比较和组件中的前层比较有些不同，`reducer` 只会比前后的 `state`



~~~js
//引入依赖
const {createStore} = require('redux')
//设置一个默认的state
const defaultState = {
  count: 0,
  message: "zhangsan"
}
//通过reducer 创建 store 就可以直接使用了
module.exports = createStore(reducer)
//将defaultState 当作默认值是规范而已
function reducer(state = defaultState, action) {
  switch(action.type) {
    case "editCount":
      return {...state, count: action.count}
    default:
      return state
  }
}
~~~



### immutable 的使用

> `redux` 中的数据不可变性

- 在`redux`中 每次修改 `state` 都需要浅拷贝一下，当 `state` 特别大的时候，进行浅拷贝也是一种性能浪费

  > 利用 `immutable`(不可变的) 减少开销
  >
  > **原理**：当一个对象树被修改之后会改变当前的节点的值，**根据这个以变的值，重新生成一个对象树**，但是会**尽可能的复用已有的节点**。

- 在 `redux Toolkit` 底层使用的是 `immerjs` 这个库来保证数据的不可变性的



~~~js
import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  hotAlbums: [],
  topAlbums: [],
  topTotal: 0
})

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_HOT_ALBUMS:
      return state.set("hotAlbums", action.hotAlbums);
    case actionTypes.CHANGE_TOP_ALBUMS:
      return state.set("topAlbums", action.topAlbums);
    case actionTypes.CHANGE_TOP_TOTAL:
      return state.set("topTotal", action.total);
    default:
      return state;
  }
}
~~~





## 二、调用action

~~~js
const store = require("../store")
//这样虽然也可以进行修改但是不能，进行跟踪
// store.getState().count = 100

const countAction = {
  type: "editCount",
  count: 200
}

store.dispatch(countAction)
console.log(store.getState())
~~~



## 三、subscribe订阅

- 当通过 `dispatch` 进行 `state` 修改的时候，会自动调用 `subscribe` 的回调

~~~typescript
//subscribe 会返回一个取消订阅的函数 执行 subscribe() 函数之后会取消订阅
const unsubscribe = store.subscribe(() => {
  console.log("zhangsna", store.getState())
})
~~~



# 第四节、Redux 结构划分规范

> 通常应用中会将 `store`、`reducer`、`action`、`constants`拆分成一个个文件
>
> - `actionCreator.js`
> - `constants.js`
> - `index.js`
> - `reducer.js`



1. 创建 `store/index.js` 文件：

   > 用于组装 `reducer` 创建 `store`，`createStore()` 主文件



2. 创建 `store/reducer.js` 文件：

   > 由于过多的 `action` 方法，会让整个的函数体变得非常大，和 `state` 都放在同一个js中，阅读性会很差。

   - 可以将单独的 `action` 拆分出来



3. 创建 `store/actionCreators.js` 文件：

   > `actionnCreators.js` 的拆分取决于 `dispatch` 方法的形参类型。
   >
   > `dispatch` 规范要传入一个包含 `type` 字段的对象，就会存在很多的 `action` 对象。
   >
   > 进行拆分的原因是方便统一管理



4. 创建 `store/constants.js` 文件：

   > 同 `vuex` ，`action` 的调用是通过 `type` 属性**字符串类型**进行定义的。

   - `action` 中 `type` 的字符串属性值，既要在 reducer 中使用也要在定义action对象的时候使用
   - 这样很容易拼写错误
   - 可以定义一些常量，来避免发生一些不必要的错误



# 第五节、react-redux

> 开始之前需要强调一下，redux和react没有直接的关系，你完全可以在React, Angular, Ember, jQuery, or vanilla、JavaScript中使用Redux。

- 尽管这样说，`redux`依然是和`React`库结合的更好，因为他们是**通过`state`函数来描述界面的状态**，`Redux`可以**发射状态的更新**，让他们作出相应

- 官方提供了 `react-redux` 的库，用于链接 react 和 redux，可以更好的结合，也更加方便的在项目中使用 `redux`，并且实现的逻辑会更加的严谨和高效。

  ~~~shell
  npm install react-redux
  ~~~



## 一、react-redux实现原理



### 1、通过 Context 对 store 解耦

#### 1.1.创建上下文

~~~typescript
//1、创建上下文
import {createContext} from 'react'
export const Zhangsan = createContext()
~~~



#### 1.2.提供上下文-store

~~~typescript
render() {
    return (
        //上下文中提供store
        <Zhangsan.Provider value={store}>
            <AppStyle>
                <div>
                    <h3>App</h3>
                    <div className="container">
                        <div className="counterA item">
                            <Counter1/>
                        </div>
                        <div className="counterB item">
                            <Counter2/>
                        </div>
                        <div className="counterC item">
                            <Counter3/>
                        </div>
                    </div>
                </div>
            </AppStyle>
        </Zhangsan.Provider>
    )
}

~~~



### 2、创建connect高阶函数实现自动刷新

~~~typescript
//创建connect高阶函数实现自动刷新
import { PureComponent } from "react";
import { Zhangsan } from '../ctx/Provider'

export function connect(mapStateToProps, mapActionToProps) {

    return function (Cpn){

        class Temp extends PureComponent {
            constructor(props, context) {
                super(props)
                this.state = mapStateToProps(context.getState())
            }

            componentDidMount() {
                this.unsubscribe = this.context.subscribe(e => {
                    this.setState(mapStateToProps(this.context.getState())
                                  })
                }
                                                          componentWillUnmount() {
                    this?.unsubscribe && this.unsubscribe()
                }

                render() {
                    return <Cpn {...mapStateToProps(this.context.getState())} {...mapActionToProps(this.context.dispatch)} {...this.props}></Cpn>
                }
            }
            Temp.contextType = Zhangsan

        return Temp
    }
}
~~~



## 二、react-redux 的使用

### 1、导入内置上下文组件传入store

~~~typescript
import React, { PureComponent } from 'react'
import {Provider} from 'react-redux'
import Counter1 from '../components/Counter1'
import store from '../store'

export class App extends PureComponent {
  render() {
    return (
        //传入store
      <Provider store={store}>
          <div className="container">
              <Counter1/>
          </div>
      </Provider>
    )
  }
}

export default App
~~~



### 2、导入connect使用

- **提示：**`connect(mapStateToProps, mapActionToProps)(Counter1)`，参数函数返回的对象属性都会添加到 `Counter1`组件的`props` 属性当中

~~~typescript
import React, { PureComponent } from 'react'
//使用connect高阶函数
import {connect} from 'react-redux'
import {addCounter} from '../store/actionCreator'

export class Counter1 extends PureComponent {

  render() {
    return (
      <div>
        <h3>Counter1</h3>
        <div className="box">
          {/*使用store传入属性*/}
          <div className="title">{this.props.message}</div>
          <div className="title">{this.props.counter}</div>
        </div>
        <div className="contorl">
          {/*使用store传入函数*/}
          <button onClick={e => this.props.addCounter(7)}>trigger</button>
        </div>
      </div>
    )
  }
}
//解耦，声明的state 都会传入到props中
const mapStateToProps = (state) => ({
  message: state.message,
  counter: state.counter
})
//声明的函数也同样会添加到 props 中
const mapActionToProps = (dispatch) => ({
  addCounter(num) {
    dispatch(addCounter(num))
  }
})
//对组件进行增强
export default connect(mapStateToProps, mapActionToProps)(Counter1)
~~~





# 第六节、redux-thunk执行异步操作



- `redux` 中默认只能 `dispatch` 对象。

  > 这样会造成，"异步请求" 的 ”逻辑“ 无法在 action 中进行

- 可以使用 `redux-thunk` 中间件，来实现让 `dispatch`  派发一个 “函数”，这样的话就可以将异步请求的逻辑放到`acion`里了



## 一、中间件 Middleware

> Middleware可以在**请求和响应之间** "嵌入" 一些操作的代码，类似express，帮助应用扩展一些其他功能

-  比如日志记录、调用异步接口、添加代码调试功能等等；
- `redux-thunk` 中间件是 "官方推荐" 的，用于嵌入react和redux 中间可以实现异步请求。



## 二、redux-thunk 的使用

- `redux` 默认使用 `dispatch` 的时候默认是不能分发函数的。



- **当然**异步请求也可以写在 `mapActionToProps` 方法中

  > 这样的话**逻辑还是在当前组件中**，并没有在 redux 中。当其他组件调用的时候，**无法传入对应请求参数。**



  - 所以要让异步请求的逻辑放到 redux 中，这样不同的组件都可以传入不同的请求参数，来改变数据

    > 虽然不太会有这种情况



- `redux-thunk` 应用之后允许，派发一函数，并将 `dispatch` 传入到分发函数的形参



### 1、配置中间件 applyMiddleware

> 导入之后，可以利用 `redux` 包中的 `applyMiddleware` 方法进行应用

~~~js
import {createStore, applyMiddleware} from 'redux'
import { reducer } from './reducer'
//导入
import thunk from 'redux-thunk'

//应用中间件方法 applyMiddleware
const store = createStore(reducer, applyMiddleware(thunk))
export default store
~~~



### 3、配置Action

> 使用 `redux-thunk` 之后允许 `dispatch` 一个高阶函数



- ##### 配置 `actionCreator`

  - 会将 `dispatch()` 方法赋值给返回函数的的**形参**

    > 以便于在 `action` 中发送网络请求

  ~~~js
  export const findBanner = (banner) => ({
    type: actionTypes.findBanner,
    banner
  })

  export const findBannerInfo = () => {
    return function (dispatch) {

      fetch("http://123.207.32.32:8000/home/multidata").then(res => res.json())
      .then(res => {
           dispatch(findBanner(res.data.banner.list))
      })
    }
  }
  ~~~



- ##### 调用

  ~~~js
  //组件中调用
    componentDidMount() {
      this.props.findBannerInfos()
    }

  //属性 和 函数 都会添加到 props 中
  export default connect(
    state => ({
      banner: state.banner
    }),
    dispatch => ({
      findBannerInfos() {
        dispatch(findBannerInfo())
      }
    })
  )(Counter3)
  ~~~





## 三、redux-thunk 的实现原理

- 个人理解：还是利用模块化

  > 利用hack一点的技术：`Monkey Patching`，在模块**第一次加载执行**的时候就修改原有的程序逻辑

  - 创建完 store的时候，直接替换掉`dispatch`，手动封装一个
  - 也是 store 中间件的实现方式，可以创建一个 `applyMiddleWare.js`, 将中间件进一步封装

~~~js
const store = createStore(reducer)

function thunk(store) {
  //保存原有的
  const next = store.dispatch
  function dispatch(action) {

    if(typeof action === "object") {
      next(action)
    } else if(typeof action === "function") {
       action(store.dispatch)
    }

  }

  store.dispatch = dispatch

}
//直接调用，修改逻辑
thunk(store)
~~~





# 第七节、Reducer代码拆分

> 在 `redux` 包中提供了，`combineReducers` 方法，帮助进行多 `reducer` 合并



## combineReducers  的使用

- 直接在 `redux` 包中导入即可

- **使用**：需要 `state` . **"合并的属性名" **. **"该模块中`state`属性"**

  ~~~js
  import {createStore, combineReducers} from 'redux'
  const reducer = combineReducers({
    counter1: counter1Reducers
    counter2: counter2Reducers
  })
  ~~~



- `dispatch` 的时候，就需要**手动定制规范**，在 `action.type` 前面**添加统一的模块名前缀**

  ~~~js
  const addCouner = "COUNTER1_ADD_COUNTER"
  const fetchBanner = "COUNTER1_FATCH_BANNER"
  ~~~





## combineReducers 实现原理

- 就是利用了，每次返回的 `state` 都会，传入当前 `reducer` 的第一个形参中
- 这样调用给的state的时候，**正好用于区分那个模块的state**
- 例：现在的 `state` 的结构就是 `state = { counter1: counter1.state}`

~~~js

//这里给默认值是防止 state.couter1 报错，这样就算值等于undefined 的时候 每个reducer 都有默认值
function reducer(state = {}, action) {

  //返回的state，在次调用的时候都会当作第一个形参传入
  return {
    //这样的话，当前对象就是下一次传入的state，state.counter1 就是上次自己返回的state
    counter1: counter1(state.counter1, action),
    counter2: counter2(state.counter2, action),
  }
}

~~~



# 第八节、redux-devtools

> `react-devtools` 不用配置，直接下载就好这里就不多说了，`redux-devtools`需要配置下

- redux官网为我们提供了`redux-devtools` 的工具，可以跟踪每次状态是如何被修改的，**修改前后的状态变化**

- 创建store的时候进行配置
- 查看配置可以到 github 查看。

~~~js
//之后安装了 redux devtools 之后winddows才会有这个函数__REDUX_DEVTOOLS_EXTENSION_COMPOSE__，生产环境删除掉就可以了
//const composeEnhancers = compose;
//trace 是开启跟踪，可以查看调用栈，点击之后可以跳到代码执行的未知
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
~~~



# 第九节、Redux Toolkit

> `Redux Toolkit` 是官方推荐的编写 Redux 逻辑的方法，**也将之称为“RTK”；**

- Redux Toolkit包旨在成为编写Redux逻辑的标准方式，从而解决redux的编写逻辑过于的繁琐和麻烦，和文件拆分，不利于管理的问题；
- 21年就有

~~~shell
npm install @reduxjs/toolkit react-redux
~~~



## 一、Redux Toolkit特点及优势



- ##### createAsyncThunk:

  -  接受一个动作类型字符串和一个返回承诺的函数，并生成一个`pending/fulfilled/rejected`基于该承诺分派动作类型的 `thunk`



1. 解决了**复杂常量的抽取**，和**多action的声明**，避免 `action` 和 `reducer case` 不匹配的问题

   > `redux Toolkit` 可以**直接将 `reducers option` 直接导出进行调用，**

2. 多 `reducer` 的合并问题，和异步请求的问题，自动合并了 `react-thunk`

   > 还是需要 `react-redux`

3. 自动给 `action` 添加前缀。直接导出模块中的 `action` 方法

4. 自动配置 `redux DevTools`





## 二、configureStore

> 用于合并其他的 `reducer` 片段创建 `store`，



- 包装`createStore`以提供简化的配置选项和良好的默认值。

- ##### 它可以自动组合你的 `slice` `reducer`，

  > 可以自动合并其他的 `reducer` 片段

- 添加你提供的任何 `Redux` 中间件，

- ##### redux-thunk默认包含，默认就可以发送异步请求

- ##### 并启用 `Redux` `DevTools` `Extension`。不用在及逆行配置了



### 配置

- 参数 ：`Object` 类型，

- 传入 `options` 选项

  - ##### `reducer`：`Object` 类型

    > 接收其他的 reducer slice-片段， 将slice中的reducer可以组成一个对象传入此处；

  - `middleware`：

    > 可以使用参数，传入其他的中间件（自行了解）；

    - 默认继承了 `redux thunk` 和 `redux DevTools` 的配置

  - `devTools`：是否配置devTools工具，默认为true；

  ~~~js
  import {configureStore} from '@reduxjs/toolkit'
  import counterReducer from './counter1'

  const store = configureStore({
    reducer: {
      conter1: counterReducer
    },
    devTools: true
  })

  export default store
  ~~~



## 三、createSlice

> 接受 `reducer` 函数的对象、切片名称和初始状态值，**并自动生成切片`reducer`，并带有相应的`actions`。**

- 参数是`options` 对象

~~~js
import {createSlice} from '@reduxjs/toolkit'

 const reducer = createSlice({
  name: "counter1",
  //初始化数据
  initialState: {
    counter: 12
  },

  //类似与vue options 中的 methods
  reducers: {
    //这里的action 对象同样保存这type类型，但是是会将传入的实参，存放到该对象的payload属性中
    addCounter(state, action) {
      //这里直接修改 state 属性即可，不需要return state
      state.counter = state.counter + action.payload
    }
  },

})
 //注意：这里是导出的是actions 不是 reducers
const { addCounter } = reducer.actions
//这里导出的也reducerSlice 中的reducer 属性
export default reducerSlice.reducer
export { addCounter }
~~~



- `name`：

  > **字符串类型**：用户标记`slice`的名词
  > 在之后的 `redux-devtool` 中会显示对应的名词；

  - `redux-devtool` 根据 `name`来进行跟踪，**区分 `state` 的类型**

    > 使用 `name`，自动给 `dispatch` 的 `action` 的前缀

  - 一般当前模块是什么名字就起什么名字



- `initialState`：对应 `defaultState`

  > **对象类型**：初始化值，第一次初始化时的值；



- `reducers`：对应 reducer 函数

  > **对象类型**，并且可以添加很多的函数，
  >
  > 方法似于 `redux` 原来**`reducer`中的一个`case`语句**，根据 `action` 中的 `type` 属性对应方法名，进行逻辑处理
  >
  > - 此步骤省去了，复杂的常量抽取，和多`action`的声明，可以直接导出 `reducers` 的声明直接进行调用

  - 参数一：`state`
  - 参数二：调用这个`action`时，传递的`action`参数；
    `createSlice`返回值是一个对象，包含所有的`actions`；



## 四、redux Toolkit 异步请求

> 这里主要记两种写法



### 第一种 extraReducers options写法

> 在 `createSlice` 的 `options` 选项种会有一个额外的 `reducer` 选项用来配置异步请求`extraReducers`

- **重点**：发送异步请求，需要使用 `@reduxjs/toolkit` 包中的 `createAsyncThunk` 函数来创建一个异步请求
- 个人决定，只能使用 `async`
- 还有一种类似的 `addCase` 函数链式调用方法。这里就不写了

~~~js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
//这里的 extraInfo 是调用的findBanner 传入的参数
const findBanner = createAsyncThunk("zhnagsan", async (extraInfo, {dispatch}) => {

 const res = await fetch("http://123.207.32.32:8000/home/multidata").then(res => 	 res.json())

 //这里返回成功的话，就会进入 fulfilled 状态，组装action和 “zhnagsan” 组装action传入到，extraReducers options 中该方法的 fulfilled 中
 return res.data.banner.list
})

const reducerSlice = createSlice({
  name: "counter1",
  //初始化数据
  initialState: {
    counter: 12,
    banner: []
  },

  reducers: {
    changeBanner(state, action) {
      state.banner = action.payload
      console.log(state.banner)
    }
  },
  //在这里配置异步请求
  extraReducers: {
      //这里处理 fulflled 还有 rejected 和 opening 状态
      //[findBanner.rejected]:(state, action) =>{}
      //[findBanner.opening]:(state, action) =>{}
      [findBanner.fulfilled]: (state, action) => {
			state.banner = action.banner
      }
  }

})
export const {changeBanner} = reducerSlice.actions
export default reducerSlice.reducer
~~~



### 第二种 createAsyncThunk 单独提交

- 参数方法，会有第二个参数对象类型，包含了`dispatch`、`state`... 一些对象可以直接在这里分发

- 区别就是，在这里提交，在 `reducers` 选项种修改，而返回值的方法要在 `extraReducers` 种修改

  > **反正请求方法是要创建**的，修改`state`要么在 `reducers` 中写，要么在 `extraReducers` 中写



~~~js
const findBanner = createAsyncThunk("张三", (extraInfo, {state, dispatch}) => {

  fetch("http://123.207.32.32:8000/home/multidata").then(res => res.json()).then(res => {
    //changeBanner这个方法还是要在reducers 中创建的
      dispatch(changeBanner(res.data.banner.list))
  })

})
export const {changeBanner} = reducerSlice.actions
export default reducerSlice.reducer
~~~

