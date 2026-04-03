---
title: '第一章、react 介绍'
---

# 第一章、react 介绍

> 个人感觉，就是同 jsp形式上类似

- ##### 特点

  1. 声明式编程是目前整个大前端开发的模式：Vue、React、Flutter、SwiftUI；
  2. 它允许我们只需要维护自己的状态，当状态改变时，React可以根据最新的状态去渲染我们的UI界面；
  3. 组件化、声明式、跨平台、响应式、虚拟DOM、通过jsx技术有更纯粹的 `javaScripts` 语法



- ##### 组件化开发

  > 组件化开发页面目前前端的流行趋势，我们会将复杂的界面拆分成一个个小的组件；

  

- ##### 多平台适配

  1. 2013年，`React`发布之初主要是开发**Web**页面；

  2. 2015年，`Facebook`推出了**ReactNative**，用于开发移动端跨平台；（虽然目前Flutter非常火爆，但是还是有很多公司在使用ReactNative-）；
     
     > 用开发跨平台移动端的适配方案——native 是原生的意思
3. 2017年，`Facebook`推出**ReactVR**，用于开发虚拟现实Web应用程序；（VR也会是一个火爆的应用场景）；



- ##### React的开发依赖

  > `React` 开发依赖3个库

  1. `react`：包含 `react` 所必须的核心代码

  2. `react-dom`：`react` 渲染在不同平台所需要的核心代码，主要用于页面渲染

  3. `babel`：将 `jsx` 转换成React，创建虚拟节点方法代码的工具

     > 如果使用 `React.createElement` 来编写源代码，它编写的代码非常的繁琐和可读性差。让 `babel` 帮助我们将 `jsx` 转换成 `React.createElement`。

     ~~~html
     <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
     <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
     <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
     ~~~

     

- ##### 拆分的原因

  > 是因为 `react` 包中包含了`react` `web`和 `react-native` 所共同拥有的核心代码

  - `react-dom`针对 `web` 和 `native` 所完成的事情不同
  - `web`端：`react-dom`会将`jsx`最终渲染成真实的 `DOM`，显示在浏览器中
  - `native`端：`react-dom`会将 `jsx` 最终渲染成原生的控件（比如 `Android` 中的 `Button`，`iOS` 中的`UIButton`）。



- ##### html 使用

  1. 引入依赖库
  2. **重点**：一定要设置 `script` 标签的类型 `<script type="text/babel">`
     - 就像 vue 中使用 jsx 一样，要添加 `lang=‘jsx'`



## 一、react 渲染流程

> `react` 中是借助于 `babel` 解析的，相对与 `vue` 非常的简单，就是对应 `jsx` 生成 `React.createElement('div',{title: "zhangsan"}, "这里是内容")`
>
> `vue` 中的解析，解析的过程中还需要一些指令进行处理

- (1)、所以 `jsx` **被`babel` 转化之后** 的代码就是，`React.createElement()`，相似于 `vue` 中的 `h()` 函数

  > 因此，可以直接使用 `React.createElement()` 写 `react` 代码，但是可读性非常差

  

-  (2)、`React.createElement` 执行最终创建出来一个 `ReactElement`对象，组成了一个JavaScript的对象树

  > JavaScript的对象树就是虚拟DOM（Virtual DOM）



- (3)、最后将虚拟dom，同步渲染成真实的dom，展示到页面上。





## 二、虚拟DOM的作用

1. 可以快速的进行 `diff` 算法，来决定哪些节点需要更新，哪些不需要更新

2. 跨平台，`react-navtive`

3. 通过虚拟 `DOM` 将命令式编程转到了声明式编程的模式

   > 它是一个相对简单的 `JavaScript` 对象
   > **通过**声明 `ReactDOM.render` 让虚拟 `DOM` 和 真实`DOM`**同步起来**，这个过程中称为**更新** (`patch`)，又被称为**“比对”(diffing)** 或**“协调”(reconciliation)**。

   - 只需要告诉 `React` 希望让`UI`是什么状态
   - `React` 来确保 `DOM` 和这些状态是匹配的
   - 不需要直接进行 `DOM` 操作，就可以从手动更改 `DOM`、属性操作、事件处理中解放出来

   > 一个运行时渲染器将会遍历整个虚拟 `DOM` 树，并据此构建真实的 `DOM` 树。这个过程被称为**挂载** (`mount`)。

   

## 三、react 响应式更新

- 在`react`中**没有双向绑定的概念**，每次更新页面和值都需要**手动调用**指定的`api`来触发

  

- ##### `React` 只更新它需要更新的部分

  > 尽管每次修改都会新建一个描述整个`dom`的`VNode`，但只会更新实际改变了的内容的`dom`元素。

  - 会**进行优化**，子组件没发生变化的话，就**只会重新生成当前组件的`VNode`**



- `React` 框架在**接收**到用户状态改变**通知后**，会根据当前渲染树，结合最新的状态改变，**通过Diff算法**，计算出树中变化的部分、自动且高效的同步到虚拟 `DOM`，最后再**批量**同步到真实`DOM`中**只更新变化的部分**（ `DOM`操作）。
  - 浏览器的重绘和回流都是比较昂贵的操作，如果每一次改变都直接对DOM进行操作，这会带来性能问题，**而批量操作只会触发一次DOM更新**。
  - 而不是每次改变都去操作一下DOM。
  - 从而避免整棵树重构，提高性能。



- 如果DOM只是外观风格发生变化，如颜色变化，会导致浏览器重绘界面。
- 如果DOM树的结构发生变化，如尺寸、布局、节点隐藏等导致，浏览器就需要回流（及重新排版布局）。



# 第二章、jsx 语法

> `JSX`是一种`JavaScript`的语法扩展（`eXtension`），也在很多地方称之为`JavaScript XML`，因为看起就是一段`XML`语法；

- jsx 用于描述我们的UI界面，将**标签 和 JavaScript 融合在一起使用**；
- **不需要**专门学习模块语法中的一些指令（比如`v-for`、`v-if`、`v-else`、`v-bind`）
- 就是 `js` 加 `html` 混在一起使用，就像是`jsp`，`ejs`



## 一、React为什么选择JSX

> `React` 认为像 `vue template` 模板语法那样，渲染逻辑本质上与其他UI逻辑**存在内在耦合**

- 简单说，模板语法 和 `js` 之前存在**很强的耦合性**，实现业务逻辑上**太依赖模板了**，并没有 `jsx` 自由，js更好的实现思想，都要考虑模板



## 二、jsx 语法规范(重点)

1. `jsx` **标签不能是字符串**，都需要`babel`进行转换

   

2. `react`组件**首字母**必须大写

   > 因为 `React` 中使用 `JSX` 语法引入组件的时候，是**根据首字母**是否大写来**区分**它 `react` 组件还是 `dom` 元素。

   

3. `jsx` **只能**有**一个根**，`vue2` 也只能有一个根，`vue3`可以有多个根

   

4. 通常使用**分组运算符**将换行的`jsx`，**当作一个整体**

   

5. 可以是双标签，单标签**必须**使用 **`/>` 结尾**，例：img 标签，后面要加 /

   

6. `jsx`中使用 `{}` 包裹js代码进行执行，注释也是一样 `{/* */}`

   

7. 在子元素(可以理解为被jsx标签包裹的 `{}` ) 的 `{}` 中如果存放的是**数组**的话，会将数组元素**全部取出，直接显示**。放的 `jsx` 标签的话也会显示

   

8. `Number`、`String` **会**直接显示

   

9. `null`、`undefined`、`Boolean` **不会**显示内容，必须要转换成字符传显示 `{ture.toString()}`

   - **注意**：但是元素会正常显示

   ~~~typescript
   //布尔类型需要转换成 String 之后才可以显示，不转化的话这里是个空标签 <div></div>
   <div>{this.state.flag.toString()}</div>
   ~~~

   

10.  `Object` 不能作为 `jsx` 标签内容，会报错

    ~~~typescript
        constructor() {
          super();
          this.state = {
            argu3: {name: "zhangsan ", age: 98}
          }
        } 
    
        render() {
          return (
            <div>
              {/* 会报错  <div>{this.state.argu3}</div> */}
            </div>
          )
        }
    ~~~

    

11. `{}` 语法也可以**嵌入表达式**、运算表达式、三元运算符、执行一个函数。

    

12. `render()` 函数当中返回的**jsx内容( 注意：这里是jsx内容 )**，就是之后React会帮助我们渲染的内容

    - ##### 参数：要渲染的根组件

      > ##### 要是 jsx 内容，或者 jsx 组件





## 三、jsx 绑定

### 属性基本绑定

- 属性绑定统一 `{}`，例：`title={}`, 再次提示`jsx{}`不是字符串，

### class绑定

- `class` 绑定 `{}` + `${}`

- jsx 最后还是要转换为 js，由于 `class` 是关键字，所以定义的时候要**使用`className` 替代 class**，**尽量避免冲突**

~~~typescript
        <div>
          <button 
              className={`${this.state.flag ? 'box' : ''}`} 
              onClick={() => this.trigger()}
          >
           trigger
          </button>
        </div>
~~~



### style 绑定

- `jsx` 中 **不支持** `style` 字符串写法，`style` 的值本质上又是一个对象，可以 **直接给 `style` 属性赋值 `css` 属性对象**

- 需**要**使用 `Object` 写法

  > 之前提到的 ( 只是被**标签元素包裹的 jsx内容** 不支持`Object` )

- **注意**：根据规范，这里的 `{{}}`，并不是 `mustache` 语法

~~~typescript
          <button onClick={this.foo.bind(this)}>
            foo
          </button>
          <div style={
            {
                width: "100px", 
                height: "100px", 
                backgroundColor: "green", 
                //绑定样式
                border: `${this.state.str}`
            }
    			}>
          </div>
~~~







# 第三章、React 的条件/列表渲染

> React中，所有的**条件判断与列表渲染**都和普通的JavaScript代码一致；**简单来说就是js判断。**



## 一、条件判断



### 1、if判断

> react 中的逻辑判断，就是普通的 if 语句

- 实现 `v-show` 直接添加类即可

~~~typescript
     let showElement = null
        if (isReady) {
          showElement = <h2>准备开始比赛吧</h2>
        } else {
          showElement = <h1>请提前做好准备!</h1>
        }
~~~



### 2、三元运算符

~~~typescript
 <div>{ isReady ? <button>开始战斗!</button>: <h3>赶紧准备</h3> }</div>
~~~



### 3、&&判断

> 应用场景：在状态中**取出属性值**的时候，有可能这个状态在初始化或者**某些情况**为 `null`/`undefined` 的时候会报错，使用&&可以避免报错，等到**真正有值的时候在去使用。**
>
> - 用的很多
> - false 是不会显示的

~~~typescript
<div>{ friend && <div>{friend.name + " " + friend.desc}</div> }</div>
~~~



### 4、使用es11可选链进行判断



## 二、列表渲染

> 其实就是，使用for循环组装jsx

- 但更多的方式是使用，**map组装 jsx 元素列表**，直接通过 `{}` 语法进行展示

  > 以为，jsx 数组当作，元素内容的时候，会直接将jsx元素取出，直接展示

- 例：

  ~~~typescript
  books.map((item, index) => {
                    return (
                      //key值，要添加，方便进行diff算法
                      <tr key={item.id}>
                  		{item.name}
                      </tr>
                    )
                  })
  ~~~

  



# 第四章、setState

> 开发中并不能直接通过修改state的值来让界面发生更新,
>
> React**并没有实现**类似于Vue2中的`Object.defineProperty`或者Vue3中的`Proxy`的方式来监听数据的变化

- **必须**通过父组件 `Component` 中的 `setState({})` 方法，来**告知** `React` 数据已经发生了变化；
- setState是一个合并的动作，没有修改的属性会保持



## 一、setState异步更新

> setState是**异步的操作**，并不能在执行完setState之后立马拿到最新的state的结果。



### setState异步的原因

- #### 批量更新，提升性能

  > 如果**每次调用 `setState` 都进行一次更新**，那么意味着 `render` 函数会被频繁调用，界面重新渲染，这样效率是很低的；

  

  - 获取到多个更新之后的值，之后进行**批量更新**

    > 在同一个事件对列当中，会一次放置多个 `setState` ，当前对列中的异步 `setState` 执行之后，在执行`render`函数。
    >
    > `render` 会**检查** `state` 和 `props` 中的属性，将被修改的值，**批量同步到真实dom上**，<u>节省回流重绘的开销</u>

    

  - 据说render执行的时机，是和屏幕的刷率有关系，不一定会等当前对列异步事件执行完毕之后执行

  

- #### 保持 render 和 setState 修改的值保持一致性

  1. 先明确 `render` 不是和 `setState` 绑定到一起的
  2. 如果 `setState` 为通过的话，**获取**到修改后的值，在**计算一些逻辑**的时候**出现了异常**，**这时已经修改了**的数据会和**页面展示**的数据**会存在差异**



### setState的三种写法

#### 1、对象写法

- 一般不推荐，直接 `this.state` 上修改属性，这样操作是**没有 `SPU` 优化的**。
  - 因此，下面第二次修改的 counter 的情况也不多见

~~~js
//异步修改，state中的值。
this.setState({counter: this.state.counter+1})
/*
由于是异步的，
”且“ 函数执行“前”会将值赋值给形参(javaScript高级，函数的执行流程)，
因此在将参数对象赋值的时候，
this.counter 还是上面 this.setSate 修改前的 this.counter
*/
this.setState({counter: this.state.counter+1})
~~~



#### 2、函数写法

> 传入回调函数写法

- 让代码实现更好的内聚性。

  > 就是可以在回调函数中，写一些代码逻辑

- 会将 “上一次” 修改的 `state` 和 `props`  ，**回传**到 “下一次” `setState` 的回调函数中

~~~js
this.setState((state, props) => {
    //可以在这里添加一些代码逻辑
    return {counter: this.state.counter+1}
})

this.setState((state, props) => {
    //这里的state 中的 counter 已经被修了
    return {counter: this.state.counter+1}
})
~~~



#### 3、传入回调函数

> setState在React的事件处理中是一个异步调用

- state 修改完成之后，会回调第二个参数传入函数

~~~js
this.setState({message: "zhangsan"}, () => {})
~~~





### setState的同步写法



- ##### 在react18之 “前”

  1.  `setTimeout` 和 “原生 `dom` 回调” 中的 `setState` 操作, 是**同步操作**
  2. 在**组件声明周期**函数，或者 **`React` 合成事件**中( 就是 `react` 中的事件回调 )，是**异步的**

- ##### 在react18之 “后”,

  - 默认所有的操作都放到了 "批处理" 中 **都变成了异步操作(批处理)**

  

- 如果在某些场景一定要同步的话可以使用 `react-dom`包 中的 `flushSync`函数

  > 参数：`callback`

  ~~~typescript
       import { flushSync } from 'react-dom'
       flushSync(() => {
          this.setState({ message: "你好啊, 李银河" })
        })
        console.log(this.state.message)
  ~~~



### hooks setState同步写法

- 结合 `useEffect` 第二个参数，依赖被修改之后自动回调





## 二、强制更新

- `this.forceUpdate()`
  - 不会经常用，不会有scu优化

全局的origin



