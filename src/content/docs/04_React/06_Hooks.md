---
title: 'React hooks'
---

# 第一节、hooks 的出现

>  **`Hook` 是 `React 16.8` 的新增特性**，对于hooks 的出现对于 `react` 是一个开创性的功能.



## 一、函数组件和类组件的问题

### 函数组件

> 函数组件有自己的**优势**，就是代**码量少**，**使用方便简单**，开发快速，**逻辑清晰**。但是也会有自己的问题

1. 函数组件没有自己的状态管理
2. 函数组件没有自己的声明周期
3. this 也不能指向组件实例



### 类组件

> 对于函数组件的一些限制，在以前的开发中大多数都会选在class组件进行开发，但是类组件也有自己的缺点

- 当业务逻辑很多的时候，一个class 组件会变得越来越复杂，由于react 的开发模式是很难进行拆封的
- 可以是使用高阶组件进行拆分，但是过多的高阶组件，在同一个class中出现，也是很难维护，阅读性差
- 还有事件监听 this 的指向问题，会让人很不理解
- 设计上也是比较困难



### 总结

- **类组件**：功能全面，业务逻辑过多，很**难拆分代码**混乱，难以维护
- **函数组件**：逻辑清晰，使用简单代码量少，**之能用于渲染页面**



## 二、hooks介绍

> hooks 的出现就是解决这个问题的，可以让我们在不编写class的情况下使用state以及其他的React特性

- 用来**弥补函数组件**以前的**一些缺陷**，提高开发效率
- Hook的出现**基本可以代替**我们之前所有使用class组件的地方
- 而且 hooks 在react 16.8 就已经使用了，是完全可选，100%向后兼容的，可以**渐进式的使用它**
- **重点理解**：（个人理解）之所以叫 `hook` 的原因，应该是，给某个业务逻辑**钩入**一些**额外的功能特性**，因此命名







### hooks 的使用要点

> Hook 就是 JavaScript 函数，这个函数可以帮助你 钩入（hook into） React State以及生命周期等特性；

1.  `Hook`**只能**在**函数组件中使用**，不能在类组件，或者函数组件之外的地方使用；

2. `hook` 只能在当前作用域的**顶层作用域使用**

   > 不要在循环、条件判断或者子函数中调用。

3. 也可以在**自定义 `hook` 中顶层**使用，自定义hook 就是**使用 use 开头的函数**



# 第二节、常见的hooks





## 一、useState

> `useState`**来自`react`**，需要从`react`中导入，它是一个`hook`
>
> `useState` 定义一个 `state`变量，`useState` 是一种新方法，它**与 class 里面的 this.state 提供的功能 "完全相同"。**

- **参数**：`any`类型 ，初始化值，如果不设置为 `undefined`；

  > `useState`接受唯一一个参数，类似 `ref`

- **返回值**：`Array` 类型，**包含两个元素**

  > 通过数组的解构，来完成赋值会非常方便

  - **元素一| 值**：当前**状态的值**（第一调用为初始化值）；

    > 函数执行完之后， `state` 中的变量会被 `React` 保留。

  - **元素二| 函数**：**设置**状态值的函数；



- ##### 重点： 当调用 索引1 的元素， `setValue` 函数的时候，函数组件会重新调用进行渲染。



##### FAQ:常见问题

1. 为什么 `hooks` 都要是 `use` 开头，而不是 `create`

   > 因为 state 属性只有组件首次渲染的时候，会进行创建，之后状态的保存都是交给 `react` 来处理的



渲染完组件的时候发生一些额外的作用





## 二、useEffect 和 useLayoutEffect

> `Effect` 副作用，给使用 `hooks` 的组件，在更新 `DOM` 的时候添加一些附带的作用

1. 完成一些类似于 `class` 中**生命周期**的功能，

   > 1. 进行异步请求
   > 2. 事件总线的监听和取消监听
   > 3. redux 的取消订阅

2. 由于**同一个函数组件**中，可以**存放多个 `useEffect` 函数**，因此 `useEffect` 所能做的要多于声明周期函数

   > 将多个业务逻辑进行区分处理，提过可读性



### useEffect/useLayoutEffect 的使用

- 执行时机：绘制之后的情况下，它也能保证在任何新的**渲染前启动**。React 在开始新的更新前，总会** 	**刷新之前的渲染的 effect

- **参数一**：`function` 类型

  - ##### 返回值 function 类型

    > 回调函数 => 组件被 “**重新渲染**” **或者**组件 “**卸载**”的时候执行


  ~~~js
  // 负责告知react, 在执行完当前组件渲染之后要执行的副作用代码
    useEffect(() => {
      // 1.监听事件
      // const unubscribe = store.subscribe(() => {
      // })
      // function foo() {
      // }
      // eventBus.on("why", foo)
      console.log("监听redux中数据变化, 监听eventBus中的why事件")

      // 返回值: 回调函数 => 组件被重新渲染或者组件卸载的时候执行
      return () => {
        console.log("取消监听redux中数据变化, 取消监听eventBus中的why事件")
      }
    })
  ~~~



- **参数二**：`Array` 类型，参数一函数所依赖的值。

  1. 如果传入存在依赖的数组时，**第一次页面渲染完之后会调用一次，之后每当依赖的值发生变化**，**参数函数会重新调用**

  > `useEffect/useLayoutEffect` 都会重复调用



  2. 参数依赖为**空数组**的话，参数函数只会在，组件**绘制(没有渲染)完成之后执行一次**

  > **传入空数组**的情况下，相当于 `mount` 和 `unmount`

  - `useEffect` 同  `mount` 挂载之后 执行时机一致

  - `useLayoutEffect ` 同  `unmount` 挂载前 执行时机一致

  3. 而参数二不传值的情况下，**”每次“ 当前组件重新 `render` 的时候都会执行**

     - 注意：重点，如果useEffect中更新了组件会出现出现了**无限循环**

       > 因为本身就是每次渲染的时候执行，在里面有放入更新代码的逻辑所以会出现无限循环







- ##### 返回值：function 类型

  - 会在执行**当前** `effect` **之前**对上一个 `effect` 进行清除。

  - 当前组件卸载的时候，`useEffect/useLayoutEffect` 的返回致函数都会执行





~~~typescript
const About = memo(() => {

  const [counter, setCounter] = useState(0)
  useEffect(() => {
    console.log("About渲染")
    return () => {
    console.log("About销毁")
    }
  }, [counter])

  useEffect(() => {
      console.log("first")
      dispatch(findHouseInfo())
      //防止出现警告
  }, [dispatch])

  function trigger(num) {
    //useEffect 依赖的counter 发生了变化，会重新执行 回调函数的
    setCounter(counter + num)
  }

  return (
    <div>
      <h4>About</h4>
      <div className="info">
        <p>{counter}</p>
        <button onClick={e => trigger(1)}>trigger</button>
      </div>
    </div>
  )
})
~~~



## 三、useRef

- **特点(重点）**：`useRef` 返回一个 `ref` 对象，返回的 `ref` 对象**在组件的整个生命周期内**保持不变。



### useRef使用场景

- **用法一**：通过 `ref` 属性获取，`react` 组件实例，或者原生`dom`

  ~~~typescript
  import React, { memo, useRef } from 'react'

  const App = memo(() => {
    const titleRef = useRef()
    const inputRef = useRef()

    function showTitleDom() {
      console.log(titleRef.current)
      inputRef.current.focus()
    }

    return (
      <div>
        <h2 ref={titleRef}>Hello World</h2>
        <input type="text" ref={inputRef} />
        <button onClick={showTitleDom}>查看title的dom</button>
      </div>
    )
  })

  export default App
  ~~~



- **用法二**：保存一个数据，这个对象**在整个生命周期中可以保存不变**；

- 解决闭包陷阱





## 四、useCallBack

> `useCallback` 实际的目的是为了**进行性能的优化**

- **重点（主要的作用）**：当需要将一个函数传递给子组件时, 最好使用`useCallback`进行优化, 将优化之后的函数, 传递给子组件。避免重复渲染，但是会有问题，下面就解决方案

- **特性**：`useCallback`  接收一个函数，会返回一个**优化后**的函数的 `memoized`（**有记忆的值**）

  > **重点**理解：简单来说就是，当 **`useCallback` 执行多次**的时候，**只会** 根据 **第一次** 传入参数**创建一个函数对象**。
  >
  > **只有**所**依赖**的值发生**变化**之后，才会**更新**优化的函数。

  - 同时 `useCallBack` 的特性，也为其本身带来了**很重要的作用**




- ##### 知识点

  - 如果**没有传**第二个参数的话，和**正常的函数没有区别**

  - 当第二个参数**存在依赖**的话，当**依赖被改变**的时候，**更新参数一函数**

  - 当第二个参数为**空数组**的情况下，会形成闭包**多次重复执行**的话都是**参数一函数**

    > 就是没有依赖需要监听改变，返回的函数也不会改变







- **参数一**：`function` 类型，**需要优化**的函数

- **参数二**：`Array` 类型，函数做**依赖**的值

  ~~~typescript
  const Counter = memo(() => {

    const [counter, setCounter] = useState(0)

    const trigger = useCallback((num) => {
      setCounter(counter + num)

       //只有参数二，数组中包含的依赖值发生了变化的时候，才会更新闭包函数
    }, [counter])
    	//如果是空数组的话，多次执行返回的函数，都会是第一次记忆的函数

    return (
      <div>
        <h4>Counter</h4>
        <div className="box">
          <div className="content">
            {counter}
          </div>
          <div className="ctrl">
          </div>
          <About trigger = {trigger}/>
        </div>
      </div>
    )

  })
  ~~~







### 1、useCallBack 存在的问题

- **问题**：尽管 `useCallBack` 记忆了第一次传入的函数，但是**并没有阻止子函数多次渲染**

> 原因：如果需要counter 更新，就必须要添加依赖，依赖变化的话，就会返回**新的函数对象**，这样子组件进行函数浅层比较的时候，依然会发生更新



### 2、结合 useRef 实现优化

> `useRef()`  **特点**：`useRef()` `hooks`**多次调用**的话，返回的是**相同的引用**

- 利用 `useRef` 这一个特性，可以不用给 `useCallBack` 传入，依赖值让它**一直是闭包的状态即可**

  ~~~typescript
  const Counter = memo(() => {

    const [counter, setCounter] = useState(0)
    const counterRef = useRef()
    //将counter 保存引用
    counterRef.current = counter
    const trigger = useCallback((num) => {
      //这里重新set 的时候，上面 counterRef 会一直递增
      setCounter(counterRef.current + num)
    }, [])

    return (
      <div>
        <h4>Counter</h4>
        <div className="box">
          <div className="content">
            {counter}
          </div>
          <div className="ctrl">
          </div>
          <About trigger = {trigger}/>
        </div>
      </div>
    )
  })
  ~~~





#### 2.1、总结

- **`useCallBack` **只有将优化有的函数**传递给子组件，**才会有性能优化

  > 使用 `useCallback` 的目的就是为了不让子组件进行多次渲染

- ##### 并不是为了缓存该函数



#### 2.2、作用

- 根据 `useCallBack` 的特性，当子组件有 "**引用**" 父组件的函数的时候，父组件发生了刷新，如果没有记忆的话，每次传入子组件的函数对象都是新创建的，之后在进行 `SCU` 的时候会**直接将子组件直接刷新**。
- 反之如果有记忆的话，**当 `state` 没有发生变化**的情况下，就**不会重复刷新子组件**。







## 五、useMemo

> `useMemo` 实际的目的也是为了进行**性能的优化。**

- `useMemo` 也会返回一个**有记忆的值。**
- 在**依赖不变**的情况下，函数组件**多次渲染执行**的时候，保存的都是**同一个值！**



### 1、useMemo 和 useCallBack 的区别

1. ##### 记忆的值不同

   - `useCallBack` 记忆的是传入的函数
   - `useMemo`  记忆的是返回值



1. ##### 应用场景不同

   1. `useCallBack` 用于优化传入子组件的**函数**

   2. ##### `useMemo` 重点

      1. 用于优化传入子组件的**对象值**，原始数据类型没有区别
      2. 当组件当中存在**复杂耗时**的业务逻辑的时候，使用 `useMemo` 可以将结果记忆，**避免重复计算**



### 2、使用

~~~typescript
import React, { memo } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'


function numCalc(num) {
  let result = null
  console.log("重新计算")
  for (let i = 0; i < num; i++) {
    result += i
  }
  return result
}


const Counter = memo(() => {

    /*
    const result = numCalc(100)
    */
      const result = useMemo(() => {
        return numCalc(100)
      }, [])

      const [count, setCounter] = useState(0)

  return (
    <div>
      <h3>Counter</h3>
      <div className="info">
        {result}
      </div>
      <div className="ctrl">
        {count}
        <button onClick={e => setCounter(count + 1)}>trigger</button>
      </div>
    </div>
  )
})

export default Counter
~~~





## 六、useReudcer

> `useReducer`仅仅是`useState`的一种替代方案

- ##### 用法同 `redux` 的 `reducer` 相似

- 在某些场景下，如果 `state` 的处理逻辑比较复杂，**针对多种情况**进行区分的时候可以**通过`useReducer`来对其进行拆分**
- 参数一：`reducer` 函数
- 参数二：初始化 `state`
- 返回值：同样**标准 `hooks`** 返回的**数组格式**，
  - `index0：state`
  - `index1：action`



~~~typescript
import React, { memo } from 'react'
import { useReducer } from 'react'

function counterReucer(state, action) {
    switch(action.type) {
      case "add":
      return {...state, counter: action.counter + state.counter}
      case "sub":
      return {...state, counter: action.counter + state.counter}
      default :
      return state
    }
}

const Counter = memo(() => {
  const [state, dispatch] = useReducer(counterReucer, {counter: 0})
  console.log(state)
  function add() {

    const action = {
      type: "add",
      counter: 1
    }
    dispatch(action)

  }

  function sub() {

    const action = {
      type: "sub",
      counter: -1
    }
    dispatch(action)

  }

  return (
    <div>
      <h3>Counter</h3>
      <div className="info">
        {state.counter}
        <div className="ctrl">
            <button onClick={e => sub()}>sub</button>
            <button onClick={e => add()}>add</button>
        </div>
      </div>
    </div>
  )
})

export default Counter
~~~





## 七、useContext

> `useCountex` 可以直接获取 `context` 的 `value`，不需要进行嵌套

- 类组件使用 `Context` ，使用多个 `Context` 的时候存在大量的嵌套

- 参数：`Context` 实例

~~~typescript
import React, { memo } from 'react'
import { useContext } from 'react'
import {CounterCtx} from '../context/counterCtx'

const Counter = memo(() => {

  const counter = useContext(CounterCtx)
  console.log(counter)

  return (
    <div>
      <h3>Counter</h3>
      <div className="info">
        kjjj
      </div>
    </div>
  )
})

export default Counter
~~~





## 8、useImperativeHandle

> 主要用于 “限制” dom操作，只允许调用该 `ref` 引用暴露出来的方法

- 参数一：父组件**转发的 `ref`**
- 参数二：`function` 类型，**返回值**(通常返回一个对象进行属性或者方法的暴露)会 “**赋值到**” 参数一 `ref.current` 属性

- 一般情况下不会使用

~~~typescript
import React, { memo, useImperativeHandle, useRef, forwardRef } from 'react'
//接收父组件传入的ref
const About = memo(forwardRef((props, ref) => {
  //这里手动给当前组件的dom节点进行绑定
  const inputRef = useRef()
  //进行限制，第一个参数父组件的ref
  useImperativeHandle(ref, () => ({
     //父组件只允许通过ref 调用这一个方法
    obtain() {
        //这里的是子组件的ref
      inputRef.current.focus()
    }
  }))

  return (
    <div>
      <h2>About</h2>
      <input ref={inputRef} type="text" />
    </div>
  )
}))

export default About
~~~





## 9、自定义hooks

> 自定义 `Hook` 本质上**只是**一种函数**代码逻辑的抽取**，严格意义上来说，它本身**并不算 `React` 的特性。**

- vue 中的 hooks 的定义没有要求
- 通过自定义 Hook，可以将**组件逻辑提取到可重用的函数中**。
- react 中的 hooks 的定义函数的名字，**必须要以 `use` 开口**



### 1、获取windows 的滚动位置

> 原理，每次滚动的时候都会 进行 setState(),
>
> 因此**每次滚动都会重新渲染当前组件**，
>
> 也就是每次都会执行 `useFetchXy()`， 返回新的x,y，

- 渲染频率过高的情况下，将**不必要的重新计算的逻辑**数据**进行记忆**

~~~typescript
import { useEffect, useState } from "react"

export function useFetchXy() {
  let [x, setX] = useState(window.scrollX)
  let [y, setY] = useState(window.scrollY)

  useEffect(() => {
    const foo = e => {
      setX(window.scrollX)
      setY(window.scrollY)
    }

    window.addEventListener("scroll", foo)
    return () => {
      window.removeEventListener("scroll", foo)
    }
  }, [])


  return [x, y]
}
~~~



### 2、封装localStorage

~~~typescript
import { useEffect } from "react"
import { useState } from "react"

function useLocalStorage(key) {
  // 1.从localStorage中获取数据, 并且数据数据创建组件的state
  const [data, setData] = useState(() => {
    const item = localStorage.getItem(key)
    if (!item) return "没有对应的key"
    return JSON.parse(item)
  })

  // 2.监听data改变, 一旦发生改变就存储data最新值
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data])

  // 3.将data/setData的操作返回给组件, 让组件可以使用和修改值
  return [data, setData]
}


export default useLocalStorage

~~~





# 第三节、redux hooks

> 在使用类组件开发，**使用 `react-redux` 库**、中的 `Provide` 和  `connect` 来和react 类组件进行结合

- 但是这种方式必须使用**高阶函数结合**返回的**高阶组件**；
- 并且必须编写：`mapStateToProps`和 `mapDispatchToProps`映射的函数；

- **在 `react-Redux7.1 ` 开始(应该是19年发布的)**，提供了 `Hook` 的方式，不需要在编写 `connect` 以及对应的映射函数了



## useSelector

> useSelector的作用是将state映射到组件中，代替了 `mapStateToProps`

- **参数一**：<`function` 类型>( 会将 `state` 赋值给形参)，**通过返回值** 将 `state` 映射到需要的数据中；



- **参数二**：`shallowEqual` 函数，可以进行比较来决定是否组件重新渲染。

  > redux 每次修改 store 的值，都会**重新创建一个 `state` 对象**，因此如果父子组件都有使用 `redux` 中的数据，父组件修改了 state 中的值，导致重新创建 state，这样的话，子组件**没有修改**也会刷新，造成性能浪费

  - **重点知识点注意**：参数二比较的是，将**前一个，`return` 的对象**，和**当前 `return` 的对象**进行 **浅层比较**，如果相同的就不进行更新

  - **注意**：是返回的对象比较**而不是 `state` 的前后对象**的比较

  - ##### 作用到子组件上



- **返回值**：参数一根据 `state` 返回的值



~~~typescript
import React, { memo } from 'react'
import { forwardRef } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

const About = memo(forwardRef((props, ref) => {
 console.log("开始渲染")
  const { message } = useSelector(state => ({
    message: state.counter.get("message")
    //添加第二个参数
  }), shallowEqual)
  return (
    <div>
      <h2>About</h2>
      <div className="box">
        {message}
      </div>
    </div>
  )
}))

export default About
~~~





## useDispatch

> `useDispatch` 使用方法很简单**没有参数，直接调用**，`useDispatch` 的**返回值就是 `dispatch` 。**

- 每次更新都会 `reducer` 都会返回一个新的 `state`

~~~typescript
 import React, { memo } from 'react'
 import { shallowEqual, useDispatch } from 'react-redux'
 import {addCounter} from '../store/counterStore'

  const dispatch = useDispatch()
  function trigger() {
    dispatch(addCounter(100))
  }
~~~





# 第四节、react 18 新增hooks





## 1、useId



### SSR

> Server side render, 指的是页面在服务器端已经生成了完成的 `HTML` 页面结构，**不需要**浏览器**执行js代码创建页面结构**

- `SSR`：在接收到请求的时候，后台通过一些模板引擎，结合后台获取的数据信息对 `html` 进行组装，因此浏览器接收到的是**完整的`html`页面**
  - 这样爬虫发起请求的时候也可以获取完整的 `html`，之后进行解析获取



- `CSR`:  页面结构会由浏览器执行 `js` 进行页面结构的搭建，所有的数据都是由 `ajax` 进行请求，之后展示到浏览器上，因此浏览器需要**先下载** `js` 文件，**之后在做执行**



### 同构应用

> 这个概念是在前端三大框架，出现后产生的，最早应该是 `Angular` 中出现的

- 同构是一种SSR的形态，是**现代SSR的一种表现形式**。

  - 当接收到网络请求之后，服务器渲染出首页的内容，**会返回html 字符串。**

    > 但仅 HTML 不足以使页面具有交互性。例如，浏览器端 JavaScript 为零的页面不能是交互式的

  -  为了使我们的页面具有交互性，除了在 Node.js 中将页面呈现为 HTML 之外，UI 框架（Vue/React/...）还在会浏览器中加载。这个过程称为`hydration`

  - 但是对应的的代码同样可以在客户端执行

  -  执行的目的包括事件绑定等以及其他页面切换时也可以在客户端被渲染；



### useId的作用

> `useId` 是一个用于生成横跨服务端和客户端的稳定的唯一 ID 的同时避免 hydration 不匹配的 hook。

- `useId`是用于 `react` 的同构应用开发的，前端的SPA页面并不需要使用它

- useId可以保证应用程序在客户端和服务器端生成唯一的ID，这样可以有效的避免通过一些手段生成的id不一致，造成 `hydration mismatch`（就是一种错误）；







## 2、useTransition

> 官方解释：会返回一个状态值表示**过渡任务的等待状态**，以及一个**启动**该过渡任务的**函数**。

- 当一些**业务逻辑复杂**的**同步任务**在执行时会造成 `js` 执行时出现**卡顿**，用户体验很差，这个时候，可以利用这个过渡任务，让该部分任务优先级调低，当其他逻辑，或者数据，先执行完或渲染完之后在进行处理



- **注意：首次**输入**会有优化**，但是 `pending` 为`ture` **等待**的时侯**执行其他操作**还是**有卡顿**

  > 渲染优先级降低



- `faker` 使用方法看 `github`

~~~shell
npm install --save-dev @faker-js/faker
~~~

### 使用 useTransition

- ##### 没有参数

- 标准 `hooks` 返回值 `Array` 类型

  - `pending`：`boolean` 过渡任务的等待状态
  - `startTransition`：`function` 类型，启动过渡任务的函数
    - 参数：也是函数类型，包裹过渡任务

~~~typescript
import React, { memo, useState, useTransition } from 'react'
import namesArray from './namesArray'

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  const [ pending, startTransition ] = useTransition()

  function valueChangeHandle(event) {
    startTransition(() => {
      const keyword = event.target.value
      const filterShowNames = namesArray.filter(item => item.includes(keyword))
      setShowNames(filterShowNames)
    })
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle}/>
      <h2>用户名列表: {pending && <span>data loading</span>} </h2>
      <ul>
        {
          showNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App

~~~



## 3、useDeferredValue

> 延时的意思，和 `useTransition` 作用相似，对于该 hooks 返回副本的更新也**会降低渲染优先级**

- **官方解释**：`useDeferredValue` 接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。
- **个人理解**：和 `toTransition` 作用相同，就是少了个 `pending`

~~~typescript
import React, { memo , useDeferredValue, useState} from 'react'
import {arr} from '../utils/faker/fakerCitys'

export const Home = memo(() => {
    const [val, setVal] = useState("")
    let [names, setNames] = useState(arr)

    // deferNames 这个副本的渲染的优先级会降低
    let deferNames = useDeferredValue(names)

    function trigger(e) {
        setVal(e.currentTarget.value)

        deferNames = arr.filter(res => {
            return res.props.children
                .toLowerCase()
                .includes(e.currentTarget.value.toLowerCase())
        })

        setNames(deferNames)
    }

  return (
    <div>
      <h3>用户信息</h3>
      <div className="container">
        <div className="inp">
          <input type="text" onChange={trigger} value={val} />
        </div>
        <div className="content">
          {/*deferNames 的渲染优先级会降低，会等待其他元素先渲染*/}
          {deferNames}
        </div>
      </div>
    </div>
  )
})

export default Home
~~~







# 5、常用的hook

1. 中英文时间格式

***

```js
import dayjs from 'dayjs';
import { useLocale } from 'next-intl';

const useLocaleDate = () => {
  const local = useLocale();

  const dateFormat = ({
    date,
    lang = local,
    zhFormat = 'YYYY年M月D日',
    enFormat = 'MMMM D, YYYY',
  }: {
    date: string;
    lang?: string;
    zhFormat?: string;
    enFormat?: string;
  }) => {
    return ['zh-tw', 'zh-cn'].includes(lang)
      ? dayjs(date).locale('zh-cn').format(zhFormat)
      : dayjs(date).locale('en').format(enFormat);
  };

  const dateRender = ({ enDate, otherDate }: { enDate: string; otherDate: string }) => {
    if (['en'].includes(local)) {
      return enDate;
    }

    return otherDate;
  };

  return {
    dateFormat,
    dateRender,
  };
};

export default useLocaleDate;
```







单页面富应用的2个问题

首屏的渲染速度

1. 请求一个index.html 文件

seo优化的问题



# 第五节、react 面试问题



## 5.1、react 高阶组件与hooks 的区别和各自的用途


高阶组件增强和复用现有的组件

Hooks 更多抽取通用逻辑，或者单独的功能，服务于组件



