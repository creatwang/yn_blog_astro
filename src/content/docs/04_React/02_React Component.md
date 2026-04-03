---
title: '一节、create-react-app 创建应用'
---

# 一节、create-react-app 创建应用

> 在之前的版本，`create-react-app` 创建的项目默认使用的包管理都是`yarn`的，最新的现在改成 `npm`了



# 二节、组件的分类(了解)

### 特点分类

React的组件相对于Vue更加的灵活和多样，按照不同的方式可以分成很多类组件

- 根据组件的定义方式，可以分为：

  - ##### 函数组件(Functional Component )

  - ##### 类组件(Class Component)；

  

- 根据组件内部是否有状态需要维护，可以分成：

  > 组件内部是否有状态维护

  - ##### 无状态组件(Stateless Component )

  - ##### 有状态组件(Stateful Component)；

  

### 职责分类

根据组件的**不同职责**，这些概念有很多重叠，但是他们最**主要是关注数据逻辑和UI展示的分离**：：

- ##### 展示型组件(Presentational Component)

  - 函数组件、无状态组件、展示型组件主要关注UI的展示；

- ##### 容器型组件(Container Component)；

  - 类组件、有状态组件、容器型组件主要关注数据逻辑；

- 当然还有很多组件的其他概念：比如**异步组件**、**高阶组件**等。





# 三节、render的返回值

> 当`this.setState()` 执行或者组件创建 **render** 被调用时，它会检查 **this.props** 和 **this.state** 的变化并返回以下类型之一：

- **React 元素**：通常通过 JSX 创建。

  > 例如：`<div />` 会被 React 渲染为 DOM 节点，`<MyComponent />` 会被 React 渲染为自定义组件；
  > 无论是 `<div />` 还是 `<MyComponent />`均为 React 元素。

- **数组**或 `fragments`：使得 `render` 方法可以返回多个元素。

- `Portals`：可以渲染子节点到不同的 DOM 子树中。

- **字符串或数值类型**：它们在 DOM 中会被渲染为文本节点

- **布尔类型或 null**：什么都不渲染





# 四节、class 组件



1. **所有**的组件类，**都要继承自** `React.Component`，并且调用 父类构造函数 `super()`

   

2. 每个组件类，都要有 `render()` 函数，返回 jsx 标签 

   - 提示：使用分组运算符包裹表示一个整体

   - ##### render() 方法是 class 组件中唯一必须实现的方法

     

3. 组件的名称是大写字符开头（无论类组件还是函数组件）

   

4. 但凡**参与**界面更新的状态，都要**声明到一个 state 的属**性当中

   > 参与界面更新的数据我们也可以**称之为是 “参与数据流” **，这个数据是定义在当前对象的state中

   - 提示：在构造函数中，`this.state[标识符] = value`

   - 这样的话 可以通过 `this.setState` 来更新数据，在**内部完成了两件事**

     > 1. 将 `state` 中`property`值 **修改** 掉 
     > 2. **自动重新执行 **`render `函数函数

     

5. **`jsx` 只能有一个根**，`vue2` 也是一个根， `vue3`可以多根



### calss 组件-事件绑定

> 在class 组件绑定事件的时候有一个缺点，就是当绑定 `onClick` 事件的时候 是 `this.foo` 赋值操作，而不是调用 `this.foo()`

- 因此会造成默认调用，`this` 指向为 `undefined`

- btnClick函数并不是我们主动调用的，而且当button发生改变时，React内部调用了btnClick函数，调用时，并不知道要如何绑定正确的this；

  ```typescript
  <button onClick={this.trigger}>trigger</button>
  //会将jsx 对象组件中的事件绑定 转换为
  React.createElement("button", {onClick: this.trigger})
  //内部进行调用的时候
  const click = config.onClick
  click()
  
  ```

  

#### 方案一：`bind` 给 `btnClick` 显示绑定 `this`

> 用起来也可以，只不过麻烦点，

- 事件对象, 会**赋值给在最后一个形参**

  > 因为bind 返回的函数传入的参数，会排在 app.bind(argus) 调用时传入的参数后面

```ts
<script type="text/babel">
    
  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        message: "欢迎登录"
      }
      {/*由于韩式会被默认调用的情况，需要手动绑定*/}
      this.trigger = this.trigger.bind(this)
    }

    trigger() {
      //1.将state中message值修改掉 2.自动重新执行render函数函数
      this.setState({
        message: "这里是李四"
      })
    }

    render() {
      return (
        <div>
          <div className="box">
            {this.state.message}
          </div>
          {/*这里是赋值的操作，将this.trigger内存中的函数对象进行赋值，而不是 this.trigger(),在转化的时候是默认调用*/}
          <button onClick={this.trigger}>trigger</button>
        </div>
      )
    }
  }
  const root = ReactDOM.createRoot(document.querySelector(".root"))
  {/*这里的要是 jsx 写法，单标签要加  /> */}
  root.render(<App/>)

</script>
```



#### 方案二：使用 `ES13 public fields` 语法

- ##### 缺点，不能传递参数，只能调用

  > 因为如果传参的话相当于调用了

```ts
  class App extends React.Component {
	{/*这里使用 es13 的pulic 公共字段*/}
    trigger = (e, message) => {
      console.log(e,message)
      // this.setState({ message })
    }

    render() {
      return (
        <div>
          <h2>{this.state.message}</h2>
           {/*如果传参的话，相当于是调用了*/}
          <button onClick={this.trigger("lisi")}>trigger</button>
        </div>
      )
    }
  }
```



#### 方案三：事件监听时传入箭头函数（推荐）

- 既可以方便的**传递参数**，也可以获取到**事件对象**

```ts
    render() {
      return (
        <div>
          <h2>{this.state.message}</h2>
           {/*这样的话既可以接收事件对象，也能接收参数*/}
          <button onClick={(e) => this.trigger("lisi")}>trigger</button>
        </div>
      )
    }
```







# 五节、函数组件

>  `function` 定义的函数，这个函数会返回和类组件中 `render` 函数返回一样的内容，这样的函数也会被当作一个组件



### 特点

> 主要用于展示

- 也会被更新并挂载，但是没**有生命周期函数**；

- **this关键字不能指向组件实例**（因为没有组件实例）；

  > props，会赋值给该函数的形参

- **没有内部状态（state）；**



# 六节、组件的生命周期

> 执行顺序按先后排列

#### 1、constructor 创建

#### 2、static getDerivedStateFromProps 

> `render`之前，无论是第一次挂载，还是更新都会调用

- **使用场景**：`state` 的值在**任何时候都依赖**于 `props` 时使用；

  > 可以在该声明周期函数中将 `props` 的值，赋值给`state`，当某一个state都需要根据 `props`来计算并且，要每次渲染都保持计算。
  >
  > 此用法并不常见，但它可能出现在 `UI` 处理中，如需要以特殊方式处理滚动位置的聊天线程等

- ##### 形参

  1. `props`：当前组件实例的 `props`
  2. `state`：当前组件实例的 `state`

- **返回值**：对象，相当于 `this.setState({})` 中的对象

  > 更新后的state

```ts
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritesite: "runoob"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritesite: props.favsite };
  }
  render() {
    return (
      <h1>我喜欢的网站是 {this.state.favoritesite}</h1>
    );
  }
}
```

 

#### 3、componentDidMount

> 组件被挂载到 `dom` 上

- 官方推荐在这个方法内**发送异步请求**。
- 相对于`vue`，完了一步，`created` 应该对应的是 `constructor`
- 参数
  - 第一个参数 `nextProps`：最新的props
  - 第二个参数 `nextState`：最新的state

#### 4、render 渲染



#### 5、shouldComponentUpdate

> **很常用** `render` 前，但是首次渲染挂载 `dom` 的时候不会，**只有更新的时候会调用**

- 返回值：`boolean`

- 如果是 `false` 的话则不会，触发 `render()` 更新。 用于**做性能优化**

  ~~~js
  shouldComponentUpdate(props, state) {
      console.log(props, state);
      return true
    }
  ~~~

  

#### 6、getSnapshotBeforeUpdate(prevProps, prevState)

> `render()` 函数执行生成 `VNode` 之后，批量同步更新渲染 `dom` 前

- 参数：
- `prevProps`：更新前的，也就是上一次 `dom` 的 `Props`
- `prevState`：更新前的 `State`
- 组件在**发生更改之前**从 DOM 中**捕获一些信息**（例如，滚动位置）。

```js
 getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML =
    "在更新前喜欢的网站是：" + prevState.favoritesite;
  }
```

- 此生命周期方法的任何**返回值将作为参数**传递给 `componentDidUpdate()`。



#### 7、componentDidUpdate

- 参数一：更新后的props
- 参数二：更新后的state
- 参数三：`getSnapshotBeforeUpdate` 的返回值

> 更新dom之后



#### 8、componentWillUnmount

- 在组件卸载及销毁之前直接调用





# 七节、父子组件通信



## 父传子

### 1、class组件

- **注意**：当存在 `state` 的时候，需要将 `props` **传入到父级构造函数中进行共享**

  > `props` 会传入到子组件构造函数的形参中，至于在该组件内共享只需要交给父类进行处理即可。

  

- **注意**：如果组件中**没有需要定义的** `state` 的话，要省略 `props` 属性

  > 其实就是**省略构造函数** `construct`，否侧会报警告。
  >
  > 省略的情况下可以直接 `this.props` 进行获取

~~~typescript
import React, { Component } from 'react'
export class Home extends Component {
  //这里用p接收的，调用的时候还是使用this.props
  constructor(p) {
    super(p)
    //这样就不会报错了
    this.state = {}
  }
  render() {
    return (
      //注意：无论构造函数中的用什么变量接收的props，这里都是this.props 获取父组件的属性
      <div>{this.props.title}</div>
    )
  }
}
~~~



### 2、函数组件

> 函数组件会将，`props` **传入函数组件的形参中**进行使用

~~~typescript
export function Foo(props) {
  return(
    <div>
      {props.title}
    </div>
  )
}
~~~



### 3、Spread Attributes

- 支持通过 `{}` 语法，直接将对象，的属性批量绑定到子组件上

```ts
<SubApp {...attr}/>
```





### 4、默认值、类型校验 

> **关键字 `propTypes`**，该对象所在的包 `prop-types`，和构造函数的属性，都是这个关键字
>
> - 从 React v15.5 开始，React.PropTypes 已移入另一个包中：`prop-types` 库
> - 分为单独的包是为了方便 `tree shake` 算法



- 函数组件和`class`组件的类型校验和默认值**相同**的

  ~~~typescript
  import propTypes  from 'prop-types'
  //Home 是class名 | 函数名
  //类型校验
  Home.propTypes ={
    title: propTypes.string
  }
  //默认值
  Home.defaultProps = {
    title: "这里是默认值"
  }
  ~~~



- 具体可以设置的类型 [查看官方文档 propTypes](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html) ；



## 子传父

> react 中的子传入，其实就是通过 `props` 来实现的

- 父组件可以向子组件**传入**一个函数，子组件 `props` 进行**调用**，将值回传给父组件

- 函数组件和 `class` 组件是一样的

  ~~~typescript
  //父组件，给子组件传入一个函数
  <SubTab desc={e => this.trigger(e)} list={this.state.list}/>
  
  //子组件，直接通过 props 进行调用，将值回传
  trigger(val){ this.props.desc(val) }
  ~~~





# 八节、非父子组件传值 Context

> 用于非父子组件之间传递，当然也可以使用**事件总线**

1. ##### 需要创建一个 Context

   ~~~typescript
   import React from "react"
   export const  AboutCtx = React.createContext("AboutCtx 的默认值")
   ~~~

2. 使用定义好的 `Ctx` **包裹所需要共享数据的子组件**

   - 按照指定的语法声明，**需要获取Context 中的`.Provider`组件**

   - **注意**：这里**接收值的 `value` 属性是固定**的，**必须**要这样传。

   ~~~typescript
   import React, { Component } from 'react'
   import Sub from './Sub'
   import {HomeCtx} from './ctx/HomeCtx'
   
   export class App extends Component {
     render() {
       return (
         <div className="box">
           <div>App</div>
             <HomeCtx.Provider value={"ZHELISHIHONG"}>
               <Sub/>
             </HomeCtx.Provider>
         </div>
       )
     }
   }
   export default App
   ~~~

3. #### 使用

   - 设置静态属性 `Low.contextType = ctx` 

   - 之后就可以在 通过，`this.context` 获取到传入的值。

     > 如果是对象的话，记得. 属性获取值，否则对象在{}语法中是不显示的。

   - 如果想要获取多个 `Ctx` 的，`value` 值，需要使用 `Context` 对象中的 `Consumer` (消费者)属性

     > 因为 `Low.contextType` 只能设置一个

     - **函数组件使用** `Context` 的时候**也是如此，通过 `Consumer` 属性**
     - 回默认调用包裹的函数，将祖先 `Provider` 传入的 `value` 的值，赋值给该函数的形参

   ~~~typescript
   import React, { Component } from 'react'
   import {AboutCtx} from './ctx/AboutCtx'
   import {HomeCtx} from './ctx/HomeCtx'
   export class Low extends Component {
     render() {
       return (
         <div className="box">
           <div>Low</div>
           <div className="into">
             {this.context}
           </div>
           <div className="SPAN">
             <AboutCtx.Consumer>
               {
                 value => <div>{value}</div>
               }
             </AboutCtx.Consumer>
           </div>
         </div>
       )
     }
   }
   Low.contextType=HomeCtx
   export default Low
   ~~~

   



# 九节、React中的插槽

> React 中不需要插槽，可以通过，其他的方法来实现插槽的功能

- 在 `react` 中可以相互传递 `react` 元素



## props.children

> 凡是组定义组件中包含的 `react` 元素，都会**添加**到 `props.children` **属性集合当中**

- **注意**：自定义组件中包含的 子组件(react 元素)，**只有一个**，就会**直接赋值到 children 属性**，就**不再是集合了**

- 如果包裹多个React 元素，在特定需求的情况下，记得逐一取出

  > 简单只有一个的时候，推荐使用，多个可以使用Props 的方式
  
  ~~~typescript
  //这里是父组件
    render() {
    return (
        <div>
          <div className="title">这里是App</div>
              
          <Sub>
            <div className="main">
               {/*只有一个的时候回赋值给props*/}
              <div>这里是插槽</div>
            </div>
          </Sub>
              
          <Sub>
            <div className="main">
              {/*如果有多个的时候 props 中的 children 属性变成数组类型
  
              */}
              <div>这里是hi2</div>
              <div>这里是hi2</div>
              <div>这里是hi2</div>
            </div>
          </Sub>
              
        </div>
      )
    }
  
  
  //这里是子组件
  import React, { Component } from 'react'
  import propTypes from 'prop-types'
  
  export class Sub extends Component {
    render() {
      //如果包裹的只有一个react元素，可以直接使用
      //如果包裹多个react元素，则是react数组，react 会自动的将数组中的元素取出进行显示
      console.log(this.props.children);
      return (
        <div>{this.props.children}</div>
      )
    }
  }
  Sub.defaultProps={}
  Sub.propTypes={}
  export default Sub
  ~~~
  
  

## props属性传递React元素

> 可以将组装好的的 React 元素，传入到子组件当中，进行展示

- ##### 父元素

~~~typescript
import React, { PureComponent } from 'react'
import Sub from './Sub'

export class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      titles: ["张三", "李四", "王五"],
      tabIndex: 0
    }
  }

  foo(e) {
    if(e === "李四") {
      return <button>{e}</button>
    } else {
      return <div>{e}</div>
    }
  }

  render() {
    const {tabIndex, titles} = this.state
    return (
      <div>
        <Sub call={e => this.setState({tabIndex: e})} parint={e => this.foo(e)} titles={titles}/>
        <div>{titles[tabIndex]}</div>
      </div>
    )
  }
}

export default App
~~~



## 作用域插槽

- 同样子传父的方式，将值回传，
- 调用回传函数的时候，根据状态组装 react 元素

~~~typescript
  let el = props.titles.map((val, index) => {
    return (
      <div className='item' onClick={e => props.call(index)} key={val}>
        {/* 将当前值回传给父元素进行处理,之后交由父组件进行组装，
        将每个子组件回传不同的数据按照，指定格式排布 */}
        {props.parint(val)}
      </div>
    )
  })
~~~





## 默认插槽

- 其实就是父子组件传值，给好 `props` 默认值即可

~~~typescript
//配置默认插槽
Sub.defaultProps={
  center: (
    <div>这里是center默认值</div>
  ),
  left: (
    <div>这里是 left 默认值</div>
  ),
  right: (
    <div>right默认值</div>
  )
}
//校验传入的是否是React元素
Sub.propTypes = {
  center: Proptypes.element,
  left: Proptypes.element,
  right: Proptypes.element
}
~~~





# 十节、React性能优化SCU

> 简单来说就是通过 `shouldcomponentUpdate` 声明周期函数，进行优化

- ##### `render` 函数执行存在的问题

  > 当父组件中存在子组件的时，子组件中的数据并没有变化，
  >
  > 但是**由于父组件中的数组改变调用了 setState 执行了`render` 函数**，
  >
  > 这样的话**子组件中的 `render` 函数也会随着执行**

- ##### 导致的问题：

  > 这样会导致当前页面存在，多个子组件，父组件进行了修改，那么**整个页面的VNode 都要重新生成**，进行diff，造成**性能浪费**



## SCU

- `shouldcomponentUpdate`

  > 该生命周期函数，会在 `render` 前进行执行

  - 参数：`nextProps`，`nextState`

    > 已经更新的 `props` 和 `state`

  - 返回值：`boolean`，之有返回 `trun` ，之后才会执行 `render`函数生成 `VNode`

    > 参数正好与 `snap` 生命周期相反。snap 的参数是上一次更新的 `props/state`

- 在 `SCU` 中进行判断，更新前后的 `state/props` 是**否发生了改变**，如果改变了，在进行更新，**否则不执行`render`函数**

  ~~~typescript
    shouldComponentUpdate(newProps, nextState) {
      // 自己对比state是否发生改变: this.state和nextState
      if (this.props.message !== newProps.message) {
        return true
      }
      return false
    }
  ~~~

  

## prueComponent和memo



### PureComponent

> `PureComponent` 是 `react` 包中的 `class`，翻译之后的意思是 ”纯组件“，也表示不被修改的意思

- 当一个类组件继承了 `PureComponent` 组件，会在内部默认实现了 `SPU` 优化 ，注意：**只是浅层的**，也是够用了
- 可以充分解决，父组件执行 `render`，之后会影响到子组件的问题



### memo

> 翻译过来 `memo`，是备忘录，由于函数组件中是没有 `SPU` 生命周期函数的，可以使用 `memo` 方法实现类似优化

- `memo` 会在父组件中`setSate()` 触发 `render` 函数时，导致子组件更新时，会进行`SPU`校验，来决定是否真正的执行

  ~~~typescript
  const Foo = memo(forwardRef((props) => {
    return (
      <div ref={ref}>zhangsan</div>
    )
  }))
  ~~~

  

## 数据不可变-shallowEqual 浅层比较

> 对比顺序，从上至下，有一个验证失败都不会刷新

1. 新老 `state/props` 进行对比是否是同一个对象

   > 这个肯定是同一个对象

2. 对比新老 `state/props` 中的`Object.keys` 的 `length` 是否一致

3. 最后遍历 `Object.keys` 根据key 获取 `value` 进行对比

   > 只是浅层遍历，**只会对比第一层中的属性**

   - **注意**：因此就算是 、对象**中的对象属性**发生修改的**也需要重新替换**，否则校验第一层发现没变化，返回`false` 拒绝刷新

   

- **结论**：修改 `state` 中的属性，就算是**深层修改**也需要**整个属性替换**，否则 `shallowEqual` **检测不到 “新 `state`” 是否发生了修改**



# 十一节、获取DOM

> 通常情况下不需要、也不建议直接操作DOM原生，但是某些特殊的情况，确实需要获取到DOM进行某些操作

- 当 `ref` 属性用于 **`HTML` 元素时**，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 **`DOM` 元素**作为其 `current` 属性；



- 当 `ref` 属性用于**自定义 `class` 组件**时，`ref` 对象接收组件的挂载**实例**作为其 `current` 属性；



## 推荐写法createRef

> 使用 `react` 包中的 `createRef()` 函数，创建`ref`引用对象

- 通过 `{}` 语法**绑定**到，**`React`元素**中 **`ref` 属性**上
- 之后通过 “**`ref`对象**” 的 `current` 属性获取 `dom` 元素

~~~typescript
  trigger() {
    console.log(this.boxRef.current);
  }
  render() {
    return (
      <div ref={this.boxRef}>
        <div className="title">Home</div>
        <button className="btn" onClick={e => this.trigger(e)}>trigger</button>
      </div>
    )
  }
~~~



## 函数写法

- `ref` 可以**绑定一个函数**，dom元素会赋值给该函数的形参
- 由于渲染的时候就会执行该函数，**将形参进行保存**

~~~typescript
  render() {
    return (
        {/*当该元素渲染的时候，“执行” ref 邦定的函数并将dom元素，赋值给形参*/}
        {/*将 el 保存下来*/}
        <div className="title" ref={el => this.titleref = el)} >Home</div>
    )
  }
~~~



## 字符串写法(废弃)

- `ref` 也可以**绑定一个字符串**
- 可以直接通过 `this.refs.字符串` 直接获取



## React.forwardRef  转发

> 函数式组件是没有实例的，所以无法通过ref获取到函数组件的实例

- 如果需要获取到子组件中的某个DOM元素，可以**使用 `forwardRef`将绑定的 `ref` 进行转发**

- **注意**: 有 `memo` 函数的话， `forwardRef` 函数要传入 `memo` 函数里的。

- **特点**：`forwardRef` 会将**父组件中绑定的 `ref` 引用对象**，**赋值给回调函数的第二个形参**，

  > 这样的话就可以在子组件中，在**通过 `ref` 属性绑定到其他的 `React` 元素上**了

~~~typescript
import React, { PureComponent, memo, createRef, forwardRef } from 'react'

const Foo = memo(forwardRef((props, ref) => {
  return (
    <div ref={ref}>zhangsan</div>
  )
}))


export class forwarkRef extends PureComponent {
  constructor() {
    super()
    this.fooRef = createRef()
  }

  trigger() {
    console.log(this.fooRef.current)
  }

  render() {
    return (
      <div>forwarkRef
        <Foo ref={this.fooRef}></Foo>
        <div className="btn">
          <button onClick={e => this.trigger(e)}>trigger</button>
        </div>
      </div>
    )
  }
}

export default forwarkRef
~~~



# 十二节、受控组件和非受控组件

> 在React中的**表单元素的特定属性**通常会保存在一些**内部的`state`**。来**交由 React 来控制**

- React中，HTML表单的处理方式和普通的DOM元素不太一样
- **受控组件**：`React` 中的表单组件，绑定了内部的 `state`，绑定表单状态默认被 `React` 管控，**只能**是通过 “ `React` ”  来**管理表单的状态**，**不能**由 “DOM默认**处理**” HTML表单的行为
- **非受控组件**： 由`DOM`默认处理HTML表单的行为，`React`并没有管理其状态



## 一、受控组件

> 前面有提到受控组件，所以受控组件的状态一定是交由 `React` 管理的，不会由 `DOM` 默认处理

- **总结**：一个受控组件中，表单数据是由 React 组件来管理的；

- 因此，当状态改变的时候，需要**手动添加事件**，来修改状态。**否则警告”且“无法修改**

  > **警告信息**：Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`

  

- `onChange`

  > `onChange` 事件与预期行为一致：**每当表单字段变化时，该事件都会被触发**。我们故意没有使用浏览器已有的默认行为，是因为 `onChange` 在浏览器中的行为和名称不对应，并且 `React` 依靠了该事件实时处理用户输入。

  - 简单说这里的 `onChange` 和原生的 `input` 事件的效果是相似的
  - 包括 `checkbox` 多选 和 `select` 都是 `onChange`



### input

~~~typescript
<input 
    type="text" 
    value={this.state.val} 
    onChange={e => this.setState({val: e.target.value})}/>
~~~



### checkbox

> 在组件状态中手动整理，选中的数组，保存到状态中，同一发送请求

~~~typescript

hobbies.map((item, index) => {
   return (
       <label htmlFor={'box'+item.name} key={item.name}>
           <input 
               type="checkbox" 
               id={'box'+item.name} 
               name={item.name}  
               checked={item.isChecked} 
               //将选中的值在这个回传，之后在回调函数中进行整理，保存到状态中
               onChange={e=>this.backCall(e, index)}
               />{item.text}
       </label>
          )
  })
~~~



### select

- 要注意的是， `react` 中的 `select` 元素无论是单选还是多选**属性值都是 `Array`类型**

~~~typescript
this.state = {hobbies: ["song"]}

trigger(e) {
    const list =  Array.from(e.target.selectedOptions, item => item.value)
    console.log(list)
}
//value 设置默认值
<select name="hobbies" value={hobbies} onChange={e => this.trigger(e)} id="" >
    <option value="sing">唱</option>
    <option value="rap">跳</option>
    <option value="jump">rap</option>
</select>
~~~



## 二、非受控组件

- React推荐**大多数情况下使用 受控组件** 来处理表单数据：

- **另一种替代方案是使用非受控组件**，这时表单数据将交由 DOM 节点来处理；

- **知识点**：非受控组件是通过，**defaultValue(input)、defaultChecked(多选，单选)** 设置默认值



# 十三节、高阶组件HOC

> 至少满足以下条件之一：
>
> 1. 接受一个或多个React组件作为输入；
> 2. 输出一个React组件；
>
> 高阶组件的英文是 **Higher-Order Components**，简称为 `HOC`；
>
> 官方的定义：**高阶组件是参数为组件，返回值为新组件的函数**；



- **作用**： 实现组件的扩展，代码的复用、**不修改原有代码的情况下，添加新的** `props`

  > 高阶组件并不是 `React API` 的一部分，它是**基于`React`的组合特性**而形成的**设计模式；**
  >
  > 简单说：只要是相同的逻辑在哪都能用。

  - 例如：`memo`、`forwardRef`



- **知识点**：
  1. 在`ES6`中，类表达式中类名是可以省略的
  2. 组件的名称都可以通过 `displayName` 来修改



- `mixin` 缺点

  > 早期的 `React` 有提供组件之间的一种复用方式是 `mixin`，目前已经不再建议使用

  -  `Mixin` 可能会相互依赖，相互耦合，不利于代码维护；
  - 不同的`Mixin`中的方法可能会相互冲突；
  - `Mixin`非常多时，组件处理起来会比较麻烦，甚至还要为其做相关处理，这样会给代码造成滚雪球式的复杂性

  **简单说**：`mixin` 多了的话不好排查问题



- `HOC` 缺点
  - HOC需要在原组件上进行包裹或者嵌套，如果**大量使用HOC**，将会产生非常**多的嵌套**，这让**调试变得非常困难**，逻辑也很混乱；
  - HOC可以劫持props，在**不遵守约定**的情况下也可能造成冲突；



- ##### Hooks的出现，是开创性的，它解决了很多React之前的存在的问题

  - `hooks` 是重点

  比如this指向问题、比如hoc的嵌套复杂度问题等等；



## 自定义示例组件

### 示例一：扩展props

- 这种方式的主要目的就是共享数据

~~~typescript
import { Fragment } from "react";
import React, { PureComponent } from 'react'

  export function bar(Cpn) {
	//这里class 作为返回值可以省略类名
    return class extends PureComponent {
      constructor() {
        this.state = {
          title: "张三"
          ,info: "你好师姐"
        }
      }

      render() {
        return (
          <Fragment>
            <Cpn {...this.state}></Cpn>
          </Fragment>
        )
      }
    }
  }
export default bar
~~~



### 示例二：共享Context

- 注意点：`HOC` 返回的一定要是个 `React` 组件
  - 要么是 `class` 组件
  - 要么是 `function `组件

~~~typescript
import { Fragment } from "react";
import {infoCtx} from "../ctx/infoCtx"

export function CtxProvider(Cpn) {
  return props => {
    return (
      <Fragment>
        <infoCtx.Consumer>
          {
            value => {
              return (
                <Cpn {...value} {...props}/>
              )
            }
          }
        </infoCtx.Consumer>
      </Fragment>
    )
  }
}
~~~





### 示例三：isShow and hide

- 根据 `prop` 传入的值进行判断需要显示的组件

~~~typescript
import React, { PureComponent } from 'react'
import About from '../conponents/About'
import Home from '../conponents/Home'

export function IsLogin(Cpn) {

  return class extends PureComponent {
    render() {
      let temp = null
      if(this.props.isLogin) {
        {/*temp = <Home></Home>*/}
        temp = this.props.children[0]
      } else {
        {/*temp = <About></About>*/}
        temp = this.props.children[1]
      }
      return (
        <div>
          <Cpn
            {temp}
          </Cpn>
        </div>
      )
    }
  }
}

~~~





## Portals

> 早于 `vue3` 中的 `teleport` 功能相似。

- **动态移动**元素或者组件，甚至独立于当前DOM元素中

  > 渲染的内容独立于父组件，甚至是独立于当前挂载到的DOM元素中

- `Portal` 提供了一种**将子节点**渲染到**存在于父组件以外的 `DOM` 节点的优秀**的方案

- `api`：`ReactDom.createProtal`, 

  > 提示：`flushSync` 方法也是 `react-dom` 包中的

  1. **参数一**：**任何 `React` 元素**，例如一个元素，字符串或 `fragment`；

  2. **参数二**：类型原生的 `DOM` 元素 

     > 参数一的 `React` 元素，会挂载到参数二原生dom元素上

  ~~~typescript
  import React, { PureComponent } from 'react'
  import { createPortal } from 'react-dom'
  
  export class Model extends PureComponent {
    render() {
      return createPortal((
        <>
            {this.props.children}
        </>
      ), document.querySelector(this.props.model))
    }
  }
  export default Model
  
  
  //使用
  <Model model={".tmp"}>
      <div>zhangsan</div>
  </Model>
  ~~~



## Fargment

- `Fragment` 组件 类似于 `vue` 中的 `template` ，小程序中的 `block`

  - 在 `react` 包下

  > 当子组件**不想要展示根的**时候，可以**用 `Fragment` 当作根**组件不会显示到页面上

- 补充知识点，vue3 中允许了组件多根，底层还是被一个 `Fragment` 组件包裹的

  > 框架之间相互借鉴

- 语法糖： `<></>`

  - 使用语法糖的时候不需要导入 `Frament` 组件
  - 如果需要绑定属性：例如 `for` 循环 `key` 的话，只能使用 完成写法 `Fargment`

~~~typescript
import React, { Fragment, PureComponent } from 'react'

export class App extends PureComponent {
  render() {
    return (
      <Fragment title="name">
        <div className="box">张三</div>
      </Fragment>
    )
  }
}

export default App
~~~



# 十四节、StrictMode 严格模式

> StrictMode 是一个用来**突出**显示应用程序中**潜在问题**的工具

- 与 `Fragment` 一样，`StrictMode` 不会渲染任何可见的 UI

  > 就是用于开启严格模式

## 主要用图

1. 识别不安全的生命周期

   > 就是不安全的生命周期

2. 使用过时的`ref API`

3. 检测过时的`context API`

   - 早期的 `Context`是通过 static 属性声明 `Context` 对象属性，通过 `getChildContext` 返回 `Context` 对象等方式来使用`Context`的；
   - 目前这种方式已经不推荐使用，大家可以自行学习了解一下它的用法；

4. 检查意外的副作用

5. 使用废弃的 `findDOMNode` 方法

   > `react-transition-group` 中就使用了这个过期的方法，**通过** `nodeRef={this.sectionRef}` 属性**手动替换绑定的引用**



## StrictMode 的副作用

- 被包裹的组件的`constructor`会被调用两次；

- 这是严格模式下**故意进行的操作**，查看在这里写的一些逻辑代码**被调用多次时**，**是否会产生一些副作用**；

- 在生产环境中，**是不会被调用两次的**；

  > 只是用于开发环境，不会打包到生产环境中



## 使用

> `StrictMode` 组件在 `react` 包下

- 只需要需要开启 严格模式的组件进行，包裹即可
- 或者直接包裹根组件

~~~typescript
import React, { Fragment, PureComponent, StrictMode } from 'react'
  render() {
    return (
        
      <StrictMode>
        <Fragment>
          <div className="box">张三</div>
        </Fragment>
      </StrictMode>
    )
  }
~~~

























